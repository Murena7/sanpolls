import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotpasswordComponent } from '@pages/login/components/forgotpassword/forgotpassword.component';
import { ForgotpasswordRoutingModule } from '@pages/login/components/forgotpassword/forgotpassword-routing.module';
import { MaterialModule } from '@shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ForgotpasswordComponent],
  imports: [CommonModule, ForgotpasswordRoutingModule, MaterialModule, ReactiveFormsModule],
})
export class ForgotpasswordModule {}
