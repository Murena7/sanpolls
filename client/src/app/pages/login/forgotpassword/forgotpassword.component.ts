import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthApiService } from '../../../core/api-services/auth-api.service';

@Component({
  selector: 'san-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
})
export class ForgotpasswordComponent implements OnInit {
  isSubmitted = false;
  form: FormGroup;

  constructor(private authApiService: AuthApiService) {}

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

    this.authApiService.forgotPassword(email).subscribe((res) => {
      this.isSubmitted = true;
    });
  }
}
