import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from '@pages/home/home-routing.module';
import { PollsShortTableComponent } from './components/polls-short-table/polls-short-table.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@shared/material/material.module';

@NgModule({
  declarations: [HomeComponent, PollsShortTableComponent],
  imports: [CommonModule, HomeRoutingModule, NgxDatatableModule, SharedModule, MaterialModule],
})
export class HomeModule {}
