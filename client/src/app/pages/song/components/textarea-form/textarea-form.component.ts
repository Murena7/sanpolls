import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ITextAreaEmitBody} from '../../../../core/interfaces/comment/comment';
import { MatInput, MatTextareaAutosize } from '@angular/material/input';

const labelText = {
  basic: 'Оставьте комментарий',
  auth: 'Чтоб оставить комментарий - aвторизируйтесь',
};

@Component({
  selector: 'san-textarea-form',
  templateUrl: './textarea-form.component.html',
  styleUrls: ['./textarea-form.component.scss'],
})
export class TextareaFormComponent implements OnInit {
  textAreaFocus = false;
  commentForm: FormGroup;
  matLabel = '';
  @ViewChild('textAreaComment', { static: true }) textAreaComment: MatInput;
  @Output() addComment = new EventEmitter<ITextAreaEmitBody>();
  @Output() cancelButton = new EventEmitter<boolean>();
  @Input() isAuth = false;
  @Input() autoFocus = false;

  constructor() {
    this.initForm();
  }

  ngOnInit(): void {
    if (!this.isAuth) {
      this.commentForm.get('commentText').disable();
    }
    this.initMatLabelText();

    if (this.autoFocus) {
      this.textAreaComment.focus();
    }
  }

  initForm() {
    this.commentForm = new FormGroup({
      commentText: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1000)]),
    });
  }

  initMatLabelText() {
    if (this.isAuth) {
      this.matLabel = labelText.basic;
    } else {
      this.matLabel = labelText.auth;
    }
  }

  submit(formDirective: FormGroupDirective) {
    if (this.commentForm.invalid) {
      return;
    }

    this.addComment.emit({
      commentText: this.commentForm.value.commentText,
    });

    this.commentForm.reset();
    formDirective.resetForm();
    this.textAreaFocus = false;
  }

  cancel(formDirective: FormGroupDirective) {
    this.commentForm.reset();
    formDirective.resetForm();
    this.textAreaFocus = false;
    this.cancelButton.emit(true);
  }
}
