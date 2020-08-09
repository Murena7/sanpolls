import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { IAddEditCommentBody, IComment } from '../../../../core/entities/comment/comment';

@Component({
  selector: 'san-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  textAreaFocus = false;
  @Input() comments: IComment[];
  @Input() isAuth: boolean;
  @Output() addComment = new EventEmitter<IAddEditCommentBody>();

  commentsForm: FormGroup;
  replyForm: FormGroup;
  openReply = false;
  panelOpenState = false;

  constructor() {
    this.initForm();
  }

  ngOnInit(): void {
    if (!this.isAuth) {
      this.commentsForm.get('commentText').disable();
    }
  }

  initForm() {
    this.commentsForm = new FormGroup({
      commentText: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });

    this.replyForm = new FormGroup({
      replyControl: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });
  }

  submit(formDirective: FormGroupDirective) {
    if (this.commentsForm.invalid) {
      return;
    }

    this.addComment.emit({
      commentText: this.commentsForm.value.commentText,
    });

    this.commentsForm.reset();
    formDirective.resetForm();
    this.textAreaFocus = false;
  }

  cancel(formDirective: FormGroupDirective) {
    this.commentsForm.reset();
    formDirective.resetForm();
    this.textAreaFocus = false;
  }

  cancelReply() {
    this.replyForm.reset();
    this.resetForm(this.replyForm);
    this.openReplyText();
  }

  resetForm(form: FormGroup) {
    form.reset();
    Object.keys(form.controls).forEach((key) => {
      form.get(key).setErrors(null);
    });
  }

  openReplyText() {
    this.openReply = !this.openReply;
  }

  replySubmit() {
    if (this.replyForm.invalid) {
      return;
    }

    // const childComment: IComment = {
    //   id: 5,
    //   userName: 'Ivan',
    //   text: this.replyForm.value.replyControl,
    //   like: 1000,
    //   dislike: 5,
    //   date: new Date(),
    // };
    // this.childComments.unshift(childComment);
    this.resetForm(this.replyForm);
    this.openReplyText();
  }
}
