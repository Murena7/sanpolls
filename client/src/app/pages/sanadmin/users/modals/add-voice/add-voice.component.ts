import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUser } from '@core/interfaces/user/user.types';
import { IAddVoiceModalResult } from '@pages/sanadmin/users/modals/add-voice/add-voice.types';

@Component({
  selector: 'san-add-voice',
  templateUrl: './add-voice.component.html',
  styleUrls: ['./add-voice.component.scss']
})
export class AddVoiceComponent implements OnInit {
  amount = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public userData: IUser, public dialogRef: MatDialogRef<AddVoiceComponent>) {}

  ngOnInit(): void {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    const result: IAddVoiceModalResult = {
      user: this.userData,
      amount: this.amount
    };
    this.dialogRef.close(result);
  }
}
