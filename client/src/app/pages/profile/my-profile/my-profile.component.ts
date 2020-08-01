import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@core/auth/auth.service';

@Component({
  selector: 'san-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  form: FormGroup;
  userData;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userData = this.authService.currentUserValue;
    this.form = new FormGroup({
      nickName: new FormControl(this.userData.username, [Validators.required, Validators.minLength(5)]),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
  }
}
