import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailConfirmationRoutingModule } from '@pages/login/components/email-confirmation/email-confirmation-routing.module';
import { EmailConfirmationComponent } from '@pages/login/components/email-confirmation/email-confirmation.component';
import { MaterialModule } from '@shared/material/material.module';

@NgModule({
  declarations: [EmailConfirmationComponent],
  imports: [CommonModule, EmailConfirmationRoutingModule, MaterialModule],
})
export class EmailConfirmationModule {}
