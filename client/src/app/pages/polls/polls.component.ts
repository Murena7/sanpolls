import { Component, OnDestroy, OnInit } from '@angular/core';
import { PollsService } from '@core/api-services/polls.service';
import { ICreateSong, ISong } from '@core/entities/song/song.types';
import { switchMap } from 'rxjs/operators';
import { DialogPollsComponent } from '@components/dialog-polls/dialog-polls.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@core/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '@core/api-services/user.service';
import { SnackbarNotificationService } from '@core/common-services/snackbar-notification.service';
import { IUser } from '@core/entities/user/user.types';
import { Subscription } from 'rxjs';
import { IPollsTablePagination } from '@pages/polls/polls.types';

@Component({
  selector: 'san-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss']
})
export class PollsComponent implements OnInit, OnDestroy {
  pollsTableData: ISong[] = [];
  totalPollsTableElements: number;
  isTableLoading = false;
  isNoMoreTableResult = false;

  activePollEndDate: string;
  activePollType: string;
  activePollName: string;
  activePollID: string;
  currentUser: IUser;
  userSubscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private pollService: PollsService,
    private router: Router,
    private userService: UserService,
    private snackbarNotificationService: SnackbarNotificationService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    this.pollService
      .getActivePoll()
      .pipe(
        switchMap(activeEvent => {
          this.activePollEndDate = activeEvent.endDate;
          this.activePollID = activeEvent.id;
          this.activePollType = activeEvent.type;
          this.activePollName = activeEvent.name;
          return this.pollService.getPolls({ id: activeEvent.id });
        })
      )
      .subscribe(res => (this.pollsTableData = res.data));
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  pollsTablePagination(params: IPollsTablePagination) {
    this.isTableLoading = true;

    this.pollService
      .getPolls(
        {
          id: params.id,
          take: params.take,
          skip: params.skip
        },
        params.disableLoader
      )
      .subscribe(res => {
        if (params.appendData) {
          this.pollsTableData = [...this.pollsTableData, ...res.data];
        } else {
          this.pollsTableData = res.data;
        }

        this.totalPollsTableElements = res.count;
        this.isTableLoading = false;

        if (res.data.length <= 0) {
          this.isNoMoreTableResult = true;
        } else {
          this.isNoMoreTableResult = false;
        }
      });
  }

  openGiveVoiceDialog(song) {
    if (this.currentUser) {
      const dialogRef = this.dialog.open(DialogPollsComponent, {
        data: {
          songData: song,
          userData: this.currentUser
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.pollService
            .giveVote(result)
            .pipe(
              switchMap(res => this.userService.refreshUserData()),
              switchMap(() => this.pollService.getPolls({ id: this.activePollID }))
            )
            .subscribe(res => {
              this.pollsTableData = res.data;
              this.snackbarNotificationService.successfully('Вы успешно проголосовали');
            });
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  addSong(song: ICreateSong) {
    this.pollService
      .createSong(song)
      .pipe(
        switchMap(res => this.userService.refreshUserData()),
        switchMap(() => this.pollService.getPolls({ id: this.activePollID }))
      )
      .subscribe(res => {
        this.pollsTableData = res.data;
        this.snackbarNotificationService.successfully('Вы успешно добавили песню');
      });
  }
}
