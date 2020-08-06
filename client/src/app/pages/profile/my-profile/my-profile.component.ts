import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/auth/auth.service';
import { UserService } from '../../../core/api-services/user.service';
import { SnackbarNotificationService } from '../../../core/common-services/snackbar-notification.service';
import { IUpdateProfileBody } from '../../../core/entities/user/user.types';

@Component({
  selector: 'san-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  form: FormGroup;
  userData;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private snackbarNotificationService: SnackbarNotificationService
  ) {}

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
    const body: IUpdateProfileBody = {
      username: this.form.value.nickName,
    };
    this.userService.profileUpdate(body).subscribe((res) => {
      this.snackbarNotificationService.successfully('Профайл успешно обновлен');
    });
  }
}
