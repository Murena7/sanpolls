import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IConfirmationModalDataBody } from '@shared/modals/confirmation-modal/confirmation-modal.types';

@Component({
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IConfirmationModalDataBody
  ) {}

  ngOnInit(): void {}

  submit() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close();
  }
}
