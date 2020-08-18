import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutPublicRoutingModule } from './layout-public-routing.module';
import { LayoutPublicComponent } from './layout-public.component';
import { NavbarModule } from '@shared/navbar/navbar.module';
import { SharedModule } from '@shared/shared.module';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
  declarations: [LayoutPublicComponent],
  imports: [CommonModule, LayoutPublicRoutingModule, NavbarModule, SharedModule, NgxUiLoaderModule],
  exports: [LayoutPublicComponent],
})
export class LayoutPublicModule {}
