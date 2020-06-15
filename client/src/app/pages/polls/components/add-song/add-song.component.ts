import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'san-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss'],
})
export class AddSongComponent implements OnInit {
  form: FormGroup;

  constructor() {}

  ngOnInit() {
    this.form = new FormGroup({
      author: new FormControl('', [Validators.required]),
      song: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required]),
      votes: new FormControl('1', [Validators.required, Validators.min(1)]),
    });
  }

  submit() {
    if (this.form.valid) {
      const formData = { ...this.form.value };
    }
  }
}
