import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogPollsComponent } from '@components/dialog-polls/dialog-polls.component';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { PollsService } from '@core/api-services/polls.service';
import { IGiveVoiceBody, ISong, ISongLikeBody } from '@core/entities/song/song.types';
import { LikeStatus } from '@core/entities/like-dislike/like-dislike.types';
import { SnackbarNotificationService } from '@core/common-services/snackbar-notification.service';
import { IUser } from '@core/entities/user/user.types';
import { AuthService } from '@core/auth/auth.service';
import { UserService } from '@core/api-services/user.service';
import { SongService } from '../../core/api-services/song.service';
import { VoteService } from '../../core/api-services/vote.service';

@Component({
  selector: 'san-poll',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss'],
})
export class SongComponent implements OnInit {
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
    private authService: AuthService,
    private songService: SongService,
    private voteService: VoteService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.songId = this.route.snapshot.paramMap.get('id');
    this.songService.getSongById(this.songId).subscribe((song) => {
      this.currentSong = song;
    });
  }

  openDialog() {
    if (this.currentUser) {
      const dialogRef = this.dialog.open(DialogPollsComponent, {
        data: {
          songData: this.currentSong,
          userData: this.currentUser,
        },
      });
      dialogRef.afterClosed().subscribe((result: IGiveVoiceBody) => {
        if (result) {
          this.voteService
            .giveVote(result)
            .pipe(switchMap((res) => this.userService.refreshUserData()))
            .pipe(switchMap((res) => this.songService.getSongById(this.songId)))
            .subscribe((song) => {
              this.snackbarNotificationService.successfully('Вы успешно проголосовали');
              this.currentSong = song;
            });
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  likeEvent(event: LikeStatus) {
    const reqBody: ISongLikeBody = {
      likeId: this.currentSong?.selfLike?.id,
      likeStatus: event,
    };
    this.songService
      .songLike(this.currentSong.id, reqBody)
      .pipe(switchMap((res) => this.songService.getSongById(this.songId)))
      .subscribe((song) => {
        this.currentSong.selfLike = song?.selfLike;
        this.showLikeChangeMessage(event);
      });
  }

  showLikeChangeMessage(likeStatus: LikeStatus) {
    switch (likeStatus) {
      case LikeStatus.unset:
        this.snackbarNotificationService.successfully('Сохранено');
        break;
      case LikeStatus.dislike:
        this.snackbarNotificationService.successfully('Дизлайк сохранен');
        break;
      case LikeStatus.like:
        this.snackbarNotificationService.successfully('Лайк сохранен');
        break;
      default:
        console.warn('Wrong setLikeStatus');
    }
  }
}
