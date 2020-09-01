import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  IComment,
  IDeleteCommentBody,
  IEditCommentBody,
  ITextAreaEmitBody,
} from '../../../../core/interfaces/comment/comment';
import { LikeStatus } from '../../../../core/interfaces/like-dislike/like-dislike.types';
import { MatDialog } from '@angular/material/dialog';
import { EditCommentModalComponent } from '../../../../shared/modals/edit-comment-modal/edit-comment-modal.component';
import { IEditCommentModalDataBody } from '../../../../shared/modals/edit-comment-modal/edit-comment-modal.types';
import { ConfirmationModalComponent } from '../../../../shared/modals/confirmation-modal/confirmation-modal.component';
import { IConfirmationModalDataBody } from '../../../../shared/modals/confirmation-modal/confirmation-modal.types';
import { IUser } from '../../../../core/interfaces/user/user.types';
import { IChildComment } from '../../../../core/interfaces/child-comment/child-comment';

@Component({
  selector: 'san-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment: IComment | IChildComment;
  @Input() currentUser: IUser;
  @Output() addReplyComment = new EventEmitter<ITextAreaEmitBody>();
  @Output() editComment = new EventEmitter<IEditCommentBody>();
  @Output() deleteComment = new EventEmitter<IDeleteCommentBody>();
  @Output() likeEvent = new EventEmitter<LikeStatus>();
  openReply = false;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openReplyText() {
    this.openReply = !this.openReply;
  }

  callLikeEvent(event: LikeStatus) {
    this.likeEvent.emit(event);
  }

  callAddReplyComment(event: ITextAreaEmitBody) {
    this.openReplyText();
    this.addReplyComment.emit(event);
  }

  callEditComment() {
    const data: IEditCommentModalDataBody = { text: this.comment.text };
    const dialogRef = this.dialog.open(EditCommentModalComponent, {
      data,
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result: IEditCommentModalDataBody) => {
      if (result) {
        this.editComment.emit({
          commentText: result.text,
          commentId: this.comment.id,
        });

        this.comment.text = result.text;
      }
    });
  }

  callDeleteComment() {
    const data: IConfirmationModalDataBody = { text: 'Удалить комментарий ?' };
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data,
      panelClass: 'confirmation-delete-modal',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteComment.emit({
          commentId: this.comment.id,
        });
      }
    });
  }
}
