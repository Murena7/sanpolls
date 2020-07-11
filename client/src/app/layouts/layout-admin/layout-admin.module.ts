import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutAdminRoutingModule } from './layout-admin-routing.module';
import { LayoutAdminComponent } from './layout-admin.component';
import { SharedModule } from '@shared/shared.module';
import { AdminNavbarModule } from '@shared/admin-navbar/admin-navbar.module';

@NgModule({
  declarations: [LayoutAdminComponent],
  imports: [CommonModule, LayoutAdminRoutingModule, SharedModule, AdminNavbarModule],
  exports: [LayoutAdminComponent]
})
export class LayoutAdminModule {}
