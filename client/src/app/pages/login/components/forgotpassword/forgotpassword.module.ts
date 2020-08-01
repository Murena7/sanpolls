import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotpasswordComponent } from '@pages/login/components/forgotpassword/forgotpassword.component';
import { ForgotpasswordRoutingModule } from '@pages/login/components/forgotpassword/forgotpassword-routing.module';
import { MaterialModule } from '@shared/material/material.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [ForgotpasswordComponent],
  imports: [CommonModule, ForgotpasswordRoutingModule, MaterialModule, SharedModule],
})
export class ForgotpasswordModule {}
