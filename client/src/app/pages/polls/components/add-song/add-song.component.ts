import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ICreateSong } from '@core/entities/song/song.types';
import { IUser } from '@core/entities/user/user.types';

@Component({
  selector: 'san-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss']
})
export class AddSongComponent implements OnInit {
  @Input() userData: IUser;
  @Input() activePollID: string;
  @Output() addSong = new EventEmitter<ICreateSong>();

  form: FormGroup;

  constructor() {}

  ngOnInit() {
    if (this.userData) {
      this.form = new FormGroup({
        songSinger: new FormControl('', [Validators.required]),
        songName: new FormControl('', [Validators.required]),
        coverSinger: new FormControl('', [Validators.required]),
        youtubeVideoId: new FormControl(''),
        additionalTextInfo: new FormControl(''),
        voiceCount: new FormControl(1, [
          Validators.required,
          Validators.min(1),
          Validators.max(this.userData.voiceBalance)
        ])
      });
    }
  }

  submit(formDirective: FormGroupDirective) {
    if (this.form.invalid) {
      return;
    }

    const song: ICreateSong = {
      eventId: this.activePollID,
      songSinger: this.form.value.songSinger,
      songName: this.form.value.songName,
      coverSinger: this.form.value.coverSinger,
      youtubeVideoId: this.form.value.youtubeVideoId,
      additionalTextInfo: this.form.value.additionalTextInfo,
      voiceCount: this.form.value.voiceCount
    };

    this.addSong.emit(song);
    this.form.reset();
    formDirective.resetForm();

    this.form.patchValue({ voiceCount: 1 });
  }
}
