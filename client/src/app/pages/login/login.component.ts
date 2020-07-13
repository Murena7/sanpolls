import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@core/api-services/user.service';
import { User } from '@core/entities/user/user.models';
import { UserRole } from '@core/entities/user/role.models';
import { UserStatus } from '@core/entities/user/user.types';
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

  constructor(private authApiService: AuthApiService, private router: Router, private userService: UserService) {}

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
      res => {
        this.router.navigate(['/profile']);
        this.formLog.reset();
        this.submitted = false;
      },
      () => {
        this.submitted = false;
      }
    );
  }

  submitRegister() {
    const userReg: User = {
      email: this.formReg.value.email,
      password: this.formReg.value.password,
      role: UserRole.User,
      status: UserStatus.Active
    };

    this.userService.createNewUser(userReg).subscribe(() => {
      this.router.navigate(['/emailcheck']);
    });
  }
}
