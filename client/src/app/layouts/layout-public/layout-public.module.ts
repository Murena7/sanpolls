import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutPublicRoutingModule } from './layout-public-routing.module';
import { LayoutPublicComponent } from './layout-public.component';
import { NavbarModule } from '@shared/navbar/navbar.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [LayoutPublicComponent],
  imports: [CommonModule, LayoutPublicRoutingModule, NavbarModule, SharedModule],
  exports: [LayoutPublicComponent]
})
export class LayoutPublicModule {}
