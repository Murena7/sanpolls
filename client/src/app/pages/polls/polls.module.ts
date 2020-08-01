import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollsComponent } from '@pages/polls/polls.component';
import { PollsRoutingModule } from '@pages/polls/polls-routing.module';
import { CountdownModule } from '@components/countdown/countdown.module';
import { SharedModule } from '@shared/shared.module';
import { ShortHistoryTableComponent } from './components/short-history-table/short-history-table.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AddSongComponent } from './components/add-song/add-song.component';
import { MaterialModule } from '@shared/material/material.module';
import { PollsTableModule } from '@pages/polls/components/polls-table/polls-table.module';

@NgModule({
  declarations: [PollsComponent, ShortHistoryTableComponent, AddSongComponent],
  imports: [
    CommonModule,
    PollsRoutingModule,
    NgxDatatableModule,
    CountdownModule,
    SharedModule,
    MaterialModule,
    PollsTableModule,
  ],
})
export class PollsModule {}
