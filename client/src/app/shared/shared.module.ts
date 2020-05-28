import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from './navbar/navbar.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, NavbarModule, ComponentsModule],
  exports: [NavbarModule, ComponentsModule],
})
export class SharedModule {}
