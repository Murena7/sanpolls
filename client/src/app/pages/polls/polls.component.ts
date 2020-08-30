import { Component, OnDestroy, OnInit } from '@angular/core';
import { PollsService } from '@core/api-services/polls.service';
import { ICreateSong, ISong } from '@core/entities/song/song.types';
import { switchMap } from 'rxjs/operators';
import { GiveVoteModalComponent } from '../../shared/modals/give-vote-modal/give-vote-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@core/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '@core/api-services/user.service';
import { SnackbarNotificationService } from '@core/common-services/snackbar-notification.service';
import { IUser } from '@core/entities/user/user.types';
import { forkJoin, Subscription } from 'rxjs';
import { IPollsTablePagination } from '@pages/polls/polls.types';
import { SongService } from '../../core/api-services/song.service';
import { VoteService } from '../../core/api-services/vote.service';
import { WindowSizeService } from '../../core/api-services/window-size.service';

@Component({
  selector: 'san-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss'],
})
export class PollsComponent implements OnInit, OnDestroy {
  pollsTableData: ISong[] = [];
  lastArchivedHistoryData: ISong[] = [];
  totalPollsTableElements: number;
  isTableLoading = false;
  isNoMoreTableResult = false;

  activePollEndDate: string;
  activePollType: string;
  activePollName: string;
  activePollID: string;
  currentUser: IUser;
  userSubscription: Subscription;
  isSmall: boolean;
  wsSub: Subscription;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private pollService: PollsService,
    private router: Router,
    private userService: UserService,
    private snackbarNotificationService: SnackbarNotificationService,
    private songService: SongService,
    private voteService: VoteService,
    public windowSizeService: WindowSizeService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });

    forkJoin({
      getActivePoll: this.pollService.getActivePoll(),
      getLastArchivedPoll: this.pollService.getLastArchivedPoll(),
    })
      .pipe(
        switchMap((result) => {
          this.activePollEndDate = result.getActivePoll.endDate;
          this.activePollID = result.getActivePoll.id;
          this.activePollType = result.getActivePoll.type;
          this.activePollName = result.getActivePoll.name;
          return forkJoin({
            pollsTableData: this.pollService.getPolls({ id: result.getActivePoll.id }),
            lastArchivedHistoryData: this.pollService.getPolls({ id: result.getLastArchivedPoll.data.id }),
          });
        })
      )
      .subscribe((res) => {
        this.pollsTableData = res.pollsTableData.data;
        this.lastArchivedHistoryData = res.lastArchivedHistoryData.data.slice(0, 3);
      });

    this.wsSub = this.windowSizeService.windowSizeChanged.subscribe((value) => {
      value.width <= 699 ? (this.isSmall = true) : (this.isSmall = false);
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.wsSub.unsubscribe();
  }

  pollsTablePagination(params: IPollsTablePagination) {
    this.isTableLoading = true;

    this.pollService
      .getPolls(
        {
          id: params.id,
          take: params.take,
          skip: params.skip,
        },
        params.disableLoader
      )
      .subscribe((res) => {
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
      const dialogRef = this.dialog.open(GiveVoteModalComponent, {
        data: {
          songData: song,
          userData: this.currentUser,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.voteService
            .giveVote(result)
            .pipe(
              switchMap((res) => this.userService.refreshUserData()),
              switchMap(() => this.pollService.getPolls({ id: this.activePollID }))
            )
            .subscribe((res) => {
              this.pollsTableData = res.data;
              this.snackbarNotificationService.successfully('Вы успешно проголосовали');
            });
        }
      });
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/polls' } });
    }
  }

  addSong(song: ICreateSong) {
    this.songService
      .createSong(song)
      .pipe(
        switchMap((res) => this.userService.refreshUserData()),
        switchMap(() => this.pollService.getPolls({ id: this.activePollID }))
      )
      .subscribe((res) => {
        this.pollsTableData = res.data;
        this.snackbarNotificationService.successfully('Вы успешно добавили песню');
      });
  }
}
