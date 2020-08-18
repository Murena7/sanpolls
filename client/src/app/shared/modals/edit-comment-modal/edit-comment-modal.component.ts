import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { IEditCommentModalDataBody } from '@shared/modals/edit-comment-modal/edit-comment-modal.types';

@Component({
  selector: 'san-edit-comment-modal',
  templateUrl: './edit-comment-modal.component.html',
  styleUrls: ['./edit-comment-modal.component.scss'],
})
export class EditCommentModalComponent implements OnInit {
  editCommentForm = this.fb.group({
    text: ['', [Validators.required, Validators.maxLength(1000)]],
  });

  constructor(
    public dialogRef: MatDialogRef<EditCommentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEditCommentModalDataBody,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editCommentForm.setValue({ text: this.data.text });
  }

  submit() {
    this.dialogRef.close(this.editCommentForm.value);
  }

  cancel() {
    this.dialogRef.close();
  }
}
