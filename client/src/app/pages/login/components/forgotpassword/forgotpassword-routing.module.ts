import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotpasswordComponent } from '@pages/login/components/forgotpassword/forgotpassword.component';

const routes: Routes = [
  {
    path: '',
    component: ForgotpasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotpasswordRoutingModule {}
