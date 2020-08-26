import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserRegistrationBody, UserStatus } from '@core/entities/user/user.types';
import { AuthApiService } from '@core/api-services/auth-api.service';
import { UserService } from '../../core/api-services/user.service';
import { faFacebookSquare, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';

export const Errors = {
  email: {
    required: 'Введите email',
    email: 'Неправильный формат email',
    incorrect: 'Неверный логин или пароль',
    in_use: 'Этот email уже занят',
    not_create: 'Пользователь не может быть создан',
  },
  password: {
    required: 'Введите пароль',
    minlength: 'Количество символов должно быть не менее 6',
    incorrect: 'Неверный логин или пароль',
  },
};

@Component({
  selector: 'san-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLog: FormGroup;
  formReg: FormGroup;
  submitted = false;
  public errors = Errors;

  /*
   Font Awesome
   */
  faFacebook = faFacebookSquare;
  faGoogle = faGooglePlusG;

  constructor(
    private authApiService: AuthApiService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.socialCallbackIntercept();
    this.initForms();
  }

  initForms() {
    this.formLog = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
    this.formReg = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      checkbox: new FormControl(null, Validators.requiredTrue),
    });
  }

  submitLogin() {
    if (this.formLog.invalid) {
      return;
    }
    this.submitted = true;
    const user = {
      email: this.formLog.value.email,
      password: this.formLog.value.password,
    };

    this.authApiService.login(user).subscribe(
      () => {
        if (this.route.snapshot.queryParams?.returnUrl) {
          this.router.navigate([this.route.snapshot.queryParams?.returnUrl]);
        } else {
          this.router.navigate(['/polls']);
        }

        this.submitted = false;
      },
      (error) => {
        const errorMessage = error?.error?.errors?.message;
        this.submitted = false;
        if (errorMessage === 'Unauthorized') {
          this.formLog.get('password').setErrors({ incorrect: true });
        }
      }
    );
  }

  socialCallbackIntercept() {
    if (this.route.snapshot.queryParams?.callback) {
      localStorage.setItem('isAuthorized', '1');
      this.userService.refreshUserData().subscribe((res) => {
        this.router.navigate(['/polls']);
        this.submitted = false;
      });
    }
  }

  submitRegister() {
    const userReg: IUserRegistrationBody = {
      email: this.formReg.value.email,
      password: this.formReg.value.password,
    };

    this.authApiService.createNewUser(userReg).subscribe(
      () => {
        this.router.navigate(['/emailcheck']);
        this.submitted = false;
      },
      (error) => {
        const errorMessage = error?.error?.errors?.message;
        this.submitted = false;
        if (errorMessage === 'This email already used') {
          this.formReg.get('email').setErrors({ in_use: true });
        }
        if (errorMessage === 'User cannot be created') {
          this.formReg.get('email').setErrors({ not_create: true });
        }
      }
    );
  }
}
