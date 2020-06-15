import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from './navbar/navbar.module';
import { ComponentsModule } from '@components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, NavbarModule, ComponentsModule, FormsModule, ReactiveFormsModule],
  exports: [NavbarModule, ComponentsModule],
})
export class SharedModule {}
