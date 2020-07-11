import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from './admin-navbar.component';
import { MaterialModule } from '@shared/material/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AdminNavbarComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [AdminNavbarComponent]
})
export class AdminNavbarModule {}
