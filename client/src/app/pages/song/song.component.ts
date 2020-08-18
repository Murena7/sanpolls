import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogPollsComponent } from '@components/../../shared/modals/dialog-polls/dialog-polls.component';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { PollsService } from '@core/api-services/polls.service';
import {
  IChildCommentLikeBody,
  IChildCommentReqLikeBody,
  ICommentLikeBody,
  ICommentReqLikeBody,
  IGiveVoiceBody,
  ISong,
  ISongLikeBody,
} from '@core/entities/song/song.types';
import { LikeStatus } from '@core/entities/like-dislike/like-dislike.types';
import { SnackbarNotificationService } from '@core/common-services/snackbar-notification.service';
import { IUser } from '@core/entities/user/user.types';
import { AuthService } from '@core/auth/auth.service';
import { UserService } from '@core/api-services/user.service';
import { SongService } from '../../core/api-services/song.service';
import { VoteService } from '../../core/api-services/vote.service';
import {
  IAddChildCommentBody,
  IAddCommentReqBody,
  IComment,
  IDeleteCommentBody,
  IEditCommentBody,
  IEditCommentReqBody,
  ILoadChildComment,
} from '../../core/entities/comment/comment';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'san-poll',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss'],
})
export class SongComponent implements OnInit, OnDestroy {
  currentSong: ISong;
  currentUser: IUser;
  songId: string;
  comments: IComment[];

  userSub: Subscription;

  constructor(
    private dialog: MatDialog,
    private pollService: PollsService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private snackbarNotificationService: SnackbarNotificationService,
    private authService: AuthService,
    private songService: SongService,
    private voteService: VoteService,
    private detection: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });

    this.songId = this.route.snapshot.paramMap.get('id');

    forkJoin({
      currentSong: this.songService.getSongById(this.songId),
      comments: this.songService.getCommentsBySongId(this.songId),
    }).subscribe((res) => {
      this.currentSong = res.currentSong;
      this.comments = res.comments;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
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

  likeCommentEvent(event: ICommentLikeBody) {
    const reqBody: ICommentReqLikeBody = {
      likeId: this.comments[event.index]?.selfLike?.id,
      likeStatus: event.likeStatus,
    };
    this.songService.commentLike(this.comments[event.index].id, reqBody).subscribe((comment) => {
      this.comments[event.index].selfLike = comment.data.selfLike;
      this.showLikeChangeMessage(event.likeStatus);
    });
  }

  likeChildCommentEvent(event: IChildCommentLikeBody) {
    const reqBody: IChildCommentReqLikeBody = {
      likeId: this.comments[event.index]?.childComments[event.childIndex]?.selfLike?.id,
      likeStatus: event.likeStatus,
    };
    this.songService
      .childCommentLike(this.comments[event.index].childComments[event.childIndex].id, reqBody)
      .subscribe((comment) => {
        this.comments[event.index].childComments[event.childIndex].selfLike = comment.data.selfLike;
        this.showLikeChangeMessage(event.likeStatus);
      });
  }

  addCommentEvent(event: IAddCommentReqBody) {
    this.songService
      .addCommentBySongId(this.songId, {
        commentText: event.commentText,
      })
      .subscribe((res) => {
        this.comments.unshift(res);
        this.snackbarNotificationService.successfully('Комментарий успешно добавлен');
      });
  }

  loadChildCommentsEvent(event: ILoadChildComment) {
    this.songService.getChildCommentsByCommentId(event.commentId, true).subscribe(
      (res) => {
        this.comments[event.index].childComments = res;
        this.comments[event.index].childLoaderFlag = false;
      },
      (error) => {
        this.comments[event.index].childLoaderFlag = false;
      }
    );
  }

  editCommentEvent(event: IEditCommentBody) {
    this.songService.editCommentByCommentId(event.commentId, { commentText: event.commentText }).subscribe((res) => {
      this.snackbarNotificationService.successfully('Комментарий успешно изменен');
    });
  }

  deleteCommentEvent(event: IDeleteCommentBody) {
    this.songService.deleteCommentByCommentId(event.commentId).subscribe((res) => {
      this.snackbarNotificationService.successfully('Комментарий успешно удален');
    });
  }

  editChildCommentEvent(event: IEditCommentBody) {
    this.songService
      .editChildCommentByChildCommentId(event.commentId, { commentText: event.commentText })
      .subscribe((res) => {
        this.snackbarNotificationService.successfully('Комментарий успешно изменен');
      });
  }

  deleteChildCommentEvent(event: IDeleteCommentBody) {
    this.songService.deleteChildCommentByChildCommentId(event.commentId).subscribe((res) => {
      this.snackbarNotificationService.successfully('Комментарий успешно удален');
    });
  }

  addReplyCommentEvent(event: IAddChildCommentBody) {
    this.songService
      .addChildCommentByCommentId(event.commentId, {
        commentText: event.commentText,
      })
      .subscribe((res) => {
        this.comments[event.index].childComments = res;

        this.snackbarNotificationService.successfully('Комментарий успешно добавлен');
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
