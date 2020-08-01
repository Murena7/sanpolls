import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IGiveVoiceBody, ISong } from '@core/entities/song/song.types';
import { IUser } from '@core/entities/user/user.types';

@Component({
  selector: 'san-dialog-polls',
  templateUrl: './dialog-polls.component.html',
  styleUrls: ['./dialog-polls.component.scss']
})
export class DialogPollsComponent implements OnInit {
  form: FormGroup;

  currentUser: IUser;
  currentSong: ISong;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<DialogPollsComponent>) {}

  ngOnInit(): void {
    if (this.data) {
      this.currentUser = this.data.userData;
      this.currentSong = this.data.songData;
      this.form = new FormGroup({
        inputNumber: new FormControl(this.currentUser.voiceBalance, [
          Validators.required,
          Validators.min(1),
          Validators.max(this.currentUser.voiceBalance)
        ])
      });
    }
  }

  submit() {
    const result: IGiveVoiceBody = {
      songId: this.currentSong.id,
      voiceCount: this.form.value.inputNumber
    };
    this.dialogRef.close(result);
  }

  cancelBtn() {
    this.dialogRef.close();
  }
}
