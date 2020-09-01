import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@pages/login/login.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'email-confirmation',
    component: EmailConfirmationComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotpasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
