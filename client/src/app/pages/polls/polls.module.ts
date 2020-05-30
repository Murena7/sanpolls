import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollsComponent } from '@pages/polls/polls.component';
import { PollsRoutingModule } from '@pages/polls/polls-routing.module';

@NgModule({
  declarations: [PollsComponent],
  imports: [CommonModule, PollsRoutingModule],
})
export class PollsModule {}
