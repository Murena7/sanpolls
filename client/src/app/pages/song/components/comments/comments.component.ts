import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  IAddChildCommentBody,
  IAddCommentReqBody,
  IComment,
  IDeleteCommentBody,
  IEditCommentBody,
  ILoadChildComment,
  ITextAreaEmitBody,
} from '../../../../core/interfaces/comment/comment';
import { LikeStatus } from '../../../../core/interfaces/like-dislike/like-dislike.types';
import { IUser } from '../../../../core/interfaces/user/user.types';
import { IChildCommentLikeBody, ICommentLikeBody } from '../../../../core/interfaces/song/song.types';

@Component({
  selector: 'san-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @Input() comments: IComment[];
  @Input() currentUser: IUser;
  @Output() addComment = new EventEmitter<IAddCommentReqBody>();
  @Output() addReplyComment = new EventEmitter<IAddChildCommentBody>();
  @Output() likeComment = new EventEmitter<ICommentLikeBody>();
  @Output() likeChildComment = new EventEmitter<IChildCommentLikeBody>();
  @Output() editComment = new EventEmitter<IEditCommentBody>();
  @Output() deleteComment = new EventEmitter<IDeleteCommentBody>();
  @Output() editChildComment = new EventEmitter<IEditCommentBody>();
  @Output() deleteChildComment = new EventEmitter<IDeleteCommentBody>();
  @Output() loadChildComments = new EventEmitter<ILoadChildComment>();

  constructor() {}

  ngOnInit(): void {}

  callDeleteComment(event: IDeleteCommentBody) {
    const elementIndex = this.comments.findIndex((element) => element.id === event.commentId);
    this.comments.splice(elementIndex, 1);
    this.deleteComment.emit(event);
  }

  callDeleteChildComment(event: IDeleteCommentBody, index: number, childIndex: number) {
    this.comments[index].childComments.splice(childIndex, 1);
    this.deleteChildComment.emit(event);
  }

  callLoadChildComments(event: ILoadChildComment) {
    this.comments[event.index].childLoaderFlag = true;
    this.loadChildComments.emit(event);
  }

  callAddReplyComment(event: ITextAreaEmitBody, commentId: string, index: number) {
    this.addReplyComment.emit({ commentId, commentText: event.commentText, index });
  }

  callLikeComment(event: LikeStatus, index: number) {
    this.likeComment.emit({
      likeStatus: event,
      index,
    });
  }

  callLikeChildComment(event: LikeStatus, index: number, childIndex: number) {
    this.likeChildComment.emit({
      likeStatus: event,
      childIndex,
      index,
    });
  }
}
