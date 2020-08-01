import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUserRegistrationBody, UserStatus } from '@core/entities/user/user.types';
import { AuthApiService } from '@core/api-services/auth-api.service';

@Component({
  selector: 'san-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLog: FormGroup;
  formReg: FormGroup;
  submitted = false;

  constructor(private authApiService: AuthApiService, private router: Router) {}

  ngOnInit() {
    this.formLog = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
    this.formReg = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      checkbox: new FormControl(null, Validators.requiredTrue)
    });
  }

  submitLogin() {
    if (this.formLog.invalid) {
      return;
    }
    this.submitted = true;
    const user = {
      email: this.formLog.value.email,
      password: this.formLog.value.password
    };

    this.authApiService.login(user).subscribe(
      () => {
        this.router.navigate(['/profile']);
        this.submitted = false;
      },
      () => {
        this.submitted = false;
      }
    );
  }

  submitRegister() {
    const userReg: IUserRegistrationBody = {
      email: this.formReg.value.email,
      password: this.formReg.value.password
    };

    this.authApiService.createNewUser(userReg).subscribe(() => {
      this.router.navigate(['/emailcheck']);
    });
  }
}
