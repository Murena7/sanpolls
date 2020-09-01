import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthApiService } from '../../../core/api-services/auth-api.service';
import { SnackbarNotificationService } from '../../../core/common-services/snackbar-notification.service';

@Component({
  selector: 'san-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss'],
})
export class EmailConfirmationComponent implements OnInit {
  isSubmitted = false;
  form: FormGroup;

  constructor(
    private authApiService: AuthApiService,
    private snackbarNotificationService: SnackbarNotificationService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  submitEmail() {
    if (this.form.invalid) {
      return;
    }

    const email = this.form.value.email;

    this.authApiService.resendEmailVerification(email).subscribe(
      (res) => {
        this.isSubmitted = true;
      },
      (error) => {
        const errorMessage = error?.error?.errors?.message;
        if (errorMessage === 'Email already confirmed') {
          this.snackbarNotificationService.successfully('Email уже подтвержден');
        }
      }
    );
  }
}
