import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '@pages/login/login.component';
import { LoginRoutingModule } from '@pages/login/login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@shared/material/material.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, LoginRoutingModule, MaterialModule, ReactiveFormsModule],
})
export class LoginModule {}
