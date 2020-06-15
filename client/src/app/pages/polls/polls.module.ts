import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollsComponent } from '@pages/polls/polls.component';
import { PollsRoutingModule } from '@pages/polls/polls-routing.module';
import { MyCountdownModule } from '@components/countdown/countdown.module';
import { SharedModule } from '@shared/shared.module';
import { ShortHistoryTableComponent } from './components/short-history-table/short-history-table.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AddSongComponent } from './components/add-song/add-song.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@shared/material/material.module';

@NgModule({
  declarations: [PollsComponent, ShortHistoryTableComponent, AddSongComponent],
  imports: [
    CommonModule,
    PollsRoutingModule,
    NgxDatatableModule,
    MyCountdownModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class PollsModule {}
