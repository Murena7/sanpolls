import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ILikeDislike, LikeStatus } from '@core/entities/like-dislike/like-dislike.types';

@Component({
  selector: 'san-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss'],
})
export class LikeComponent implements OnInit {
  @Input() like: number;
  @Input() dislike: number;
  @Input() selfLike: ILikeDislike;
  @Input() isAuth: boolean;
  @Output() likeEvent = new EventEmitter<LikeStatus>();

  likeEnumStatus = LikeStatus;
  likeStatus = this.likeEnumStatus.unset;

  constructor() {}

  ngOnInit(): void {
    this.initLikeStatus(this.selfLike);
  }

  setLike() {
    switch (this.likeStatus) {
      case LikeStatus.like:
        this.likeStatus = this.likeEnumStatus.unset;
        this.like--;
        this.likeEvent.emit(this.likeStatus);
        break;
      case LikeStatus.dislike:
        this.likeStatus = this.likeEnumStatus.like;
        this.like++;
        this.dislike--;
        this.likeEvent.emit(this.likeStatus);
        break;
      case LikeStatus.unset:
        this.likeStatus = this.likeEnumStatus.like;
        this.like++;
        this.likeEvent.emit(this.likeStatus);
        break;
      default:
        console.warn('Wrong like status');
    }
  }

  setDislike() {
    switch (this.likeStatus) {
      case LikeStatus.dislike:
        this.likeStatus = this.likeEnumStatus.unset;
        this.dislike--;
        this.likeEvent.emit(this.likeStatus);
        break;
      case LikeStatus.like:
        this.likeStatus = this.likeEnumStatus.dislike;
        this.dislike++;
        this.like--;
        this.likeEvent.emit(this.likeStatus);
        break;
      case LikeStatus.unset:
        this.likeStatus = this.likeEnumStatus.dislike;
        this.dislike++;
        this.likeEvent.emit(this.likeStatus);
        break;
      default:
        console.warn('Wrong like status');
    }
  }

  initLikeStatus(data: ILikeDislike) {
    switch (data?.isLike) {
      case undefined:
        this.likeStatus = this.likeEnumStatus.unset;
        break;
      case true:
        this.likeStatus = this.likeEnumStatus.like;
        break;
      case false:
        this.likeStatus = this.likeEnumStatus.dislike;
        break;
      default:
        console.warn('Wrong like Init status');
        break;
    }
  }
}
