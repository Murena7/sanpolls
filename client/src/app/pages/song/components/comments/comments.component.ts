import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface IComment {
  id: number;
  userName: string;
  text: string;
  like: number;
  dislike: number;
  date: Date;
}

@Component({
  selector: 'san-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  commentsForm: FormGroup;
  replyForm: FormGroup;
  openReply = false;
  panelOpenState = false;

  childComments: IComment[] = [
    { id: 1, userName: 'John', text: 'This is cool song bro!', like: 777, dislike: 0, date: new Date() },
    { id: 2, userName: 'Smith', text: 'This is the best song ever!', like: 3213, dislike: 0, date: new Date() },
  ];

  comments: IComment[] = [
    { id: 1, userName: 'John', text: 'This is cool song bro!', like: 777, dislike: 0, date: new Date() },
    { id: 2, userName: 'Smith', text: 'This is the best song ever!', like: 3213, dislike: 0, date: new Date() },
  ];

  constructor() {}

  ngOnInit(): void {
    this.commentsForm = new FormGroup({
      commentControl: new FormControl(null, [Validators.required, Validators.minLength(1)]),
    });
    this.replyForm = new FormGroup({
      replyControl: new FormControl(null, [Validators.required, Validators.minLength(1)]),
    });
  }

  submit() {
    if (this.commentsForm.invalid) {
      return;
    }

    const comment: IComment = {
      id: 5,
      userName: 'Ivan',
      text: this.commentsForm.value.commentControl,
      like: 1000,
      dislike: 5,
      date: new Date(),
    };
    this.comments.unshift(comment);
    this.resetForm(this.commentsForm);
  }

  cancel() {
    this.commentsForm.reset();
    this.resetForm(this.commentsForm);
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

    const childComment: IComment = {
      id: 5,
      userName: 'Ivan',
      text: this.replyForm.value.replyControl,
      like: 1000,
      dislike: 5,
      date: new Date(),
    };
    this.childComments.unshift(childComment);
    this.resetForm(this.replyForm);
    this.openReplyText();
  }
}
