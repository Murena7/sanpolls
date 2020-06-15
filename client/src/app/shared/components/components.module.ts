import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCountdownModule } from '@components/countdown/countdown.module';
import { PollsTableModule } from '@components/polls-table/polls-table.module';
import { DialogPollsModule } from '@components/dialog-polls/dialog-polls.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, MyCountdownModule, PollsTableModule, DialogPollsModule],
  exports: [MyCountdownModule, PollsTableModule, DialogPollsModule],
})
export class ComponentsModule {}
