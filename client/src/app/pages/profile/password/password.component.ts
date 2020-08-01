import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '@core/helpers/must-match.validator';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'san-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit {
  form: FormGroup;
  hide = true;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

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

  // convenience getter for easy access to form fields
  // get f() { return this.form.controls; }

  submit() {
    if (this.form.invalid) {
      return;
    }
  }
}
