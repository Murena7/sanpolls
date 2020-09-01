import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IGiveVoiceBody, ISong } from '../../../core/interfaces/song/song.types';
import { IUser } from '../../../core/interfaces/user/user.types';

@Component({
  templateUrl: './give-vote-modal.component.html',
  styleUrls: ['./give-vote-modal.component.scss'],
})
export class GiveVoteModalComponent implements OnInit {
  form: FormGroup;

  currentUser: IUser;
  currentSong: ISong;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<GiveVoteModalComponent>) {}

  ngOnInit(): void {
    if (this.data) {
      this.currentUser = this.data.userData;
      this.currentSong = this.data.songData;
      this.form = new FormGroup({
        inputNumber: new FormControl(1, [
          Validators.required,
          Validators.min(1),
          Validators.max(this.currentUser.voiceBalance),
        ]),
      });
    }
  }

  submit() {
    const result: IGiveVoiceBody = {
      songId: this.currentSong.id,
      voiceCount: this.form.value.inputNumber,
    };
    this.dialogRef.close(result);
  }

  cancelBtn() {
    this.dialogRef.close();
  }
}
