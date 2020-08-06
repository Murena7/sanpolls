import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MustMatch } from '@core/helpers/must-match.validator';
import { UserService } from '../../../core/api-services/user.service';
import { IChangePasswordBody } from '../../../core/entities/user/user.types';
import { SnackbarNotificationService } from '../../../core/common-services/snackbar-notification.service';

export const Errors = {
  oldPassword: {
    required: 'Введите текущий пароль',
    minlength: 'Колличество символов должно быть не менее 6',
    incorrect: 'Неверный пароль',
  },
  newPassword: {
    required: 'Введите новый пароль',
    minlength: 'Колличество символов должно быть не менее 6',
  },
  confirmPassword: {
    required: 'Введите новый пароль',
    mustMatch: 'Введённые пароли не совпадают. Попробуйте ещё раз.',
    minlength: 'Колличество символов должно быть не менее 6',
  },
};

@Component({
  selector: 'san-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit {
  form: FormGroup;
  hide = true;
  public errors = Errors;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackbarNotificationService: SnackbarNotificationService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        oldPassword: new FormControl(null, [Validators.required]),
        newPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      },
      {
        validator: MustMatch('newPassword', 'confirmPassword'),
      }
    );
  }

  submit(formDirective: FormGroupDirective) {
    if (this.form.invalid) {
      return;
    }

    const body: IChangePasswordBody = {
      oldPassword: this.form.value.oldPassword,
      newPassword: this.form.value.newPassword,
    };

    this.userService.passwordChange(body).subscribe(
      (res) => {
        this.snackbarNotificationService.successfully('Пароль успешно изменен');
        this.form.reset();
        formDirective.resetForm();
      },
      (error) => {
        const errorMessage = error?.error?.errors?.message;
        if (errorMessage === 'Wrong Password') {
          this.form.get('oldPassword').setErrors({ incorrect: true });
        }
      }
    );
  }
}
