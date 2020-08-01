import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogPollsComponent } from '@components/dialog-polls/dialog-polls.component';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { PollsService } from '@core/api-services/polls.service';
import { IGiveVoiceBody, ISong } from '@core/entities/song/song.types';
import { ILikeDislike, ParentType } from '@core/entities/like-dislike/like-dislike.types';
import { SnackbarNotificationService } from '@core/common-services/snackbar-notification.service';
import { IUser } from '@core/entities/user/user.types';
import { AuthService } from '@core/auth/auth.service';
import { UserService } from '@core/api-services/user.service';

@Component({
  selector: 'san-poll',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {
  songLikes: ILikeDislike;
  currentSong: ISong;
  currentUser: IUser;
  songId: string;

  constructor(
    private dialog: MatDialog,
    private pollService: PollsService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private snackbarNotificationService: SnackbarNotificationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.songId = this.route.snapshot.paramMap.get('id');
    this.pollService.getSongById(this.songId).subscribe(song => {
      this.currentSong = song;
    });

    this.songLikes = {
      id: '123',
      userId: '1',
      parentId: '727',
      parentType: ParentType.Song,
      isLike: true,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString()
    };
  }

  openDialog() {
    if (this.currentUser) {
      const dialogRef = this.dialog.open(DialogPollsComponent, {
        data: {
          songData: this.currentSong,
          userData: this.currentUser
        }
      });
      dialogRef.afterClosed().subscribe((result: IGiveVoiceBody) => {
        if (result) {
          this.pollService
            .giveVote(result)
            .pipe(switchMap(res => this.userService.refreshUserData()))
            .pipe(switchMap(res => this.pollService.getSongById(this.songId)))
            .subscribe(song => {
              this.snackbarNotificationService.successfully('Вы успешно проголосовали');
              this.currentSong = song;
            });
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
