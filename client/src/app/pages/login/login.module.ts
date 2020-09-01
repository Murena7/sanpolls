import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '@pages/login/login.component';
import { LoginRoutingModule } from '@pages/login/login-routing.module';
import { MaterialModule } from '@shared/material/material.module';
import { SharedModule } from '@shared/shared.module';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

@NgModule({
  declarations: [LoginComponent, EmailConfirmationComponent, ForgotpasswordComponent],
  imports: [CommonModule, LoginRoutingModule, MaterialModule, SharedModule],
})
export class LoginModule {}
