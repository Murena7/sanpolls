import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '@core/services/user.service';
import { User } from '@core/user/user.models';
import { UserRole } from '@core/user/role.models';
import { UserStatus } from '@core/user/user.types';

@Component({
  selector: 'san-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLog: FormGroup;
  formReg: FormGroup;
  submitted = false;

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {}

  ngOnInit() {
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

    this.authService.login(user).subscribe(
      (res) => {
        this.formLog.reset();
        this.router.navigate(['/profile']);
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
      status: UserStatus.Active,
    };

    this.userService.createNewUser(userReg).subscribe(() => {
      this.router.navigate(['/emailcheck']);
    });
  }
}
