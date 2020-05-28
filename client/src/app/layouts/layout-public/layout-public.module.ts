import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutPublicRoutingModule } from './layout-public-routing.module';
import { LayoutPublicComponent } from './layout-public.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarModule } from '../../shared/navbar/navbar.module';

@NgModule({
  declarations: [LayoutPublicComponent, FooterComponent],
  imports: [CommonModule, LayoutPublicRoutingModule, NavbarModule],
  exports: [LayoutPublicComponent],
})
export class LayoutPublicModule {}
