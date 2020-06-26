import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollsTableComponent } from '@pages/polls/components/polls-table/polls-table.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@shared/material/material.module';

@NgModule({
  declarations: [PollsTableComponent],
  imports: [CommonModule, NgxDatatableModule, RouterModule, MaterialModule],
  exports: [PollsTableComponent],
})
export class PollsTableModule {}
