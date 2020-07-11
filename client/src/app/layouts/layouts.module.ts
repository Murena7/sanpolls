import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutPublicModule } from './layout-public/layout-public.module';
import { LayoutAdminModule } from '@layouts/layout-admin/layout-admin.module';

@NgModule({
  imports: [CommonModule, LayoutAdminModule, LayoutPublicModule],
  exports: [LayoutAdminModule, LayoutPublicModule]
})
export class LayoutsModule {}
