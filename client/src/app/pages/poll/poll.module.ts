import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogPollsComponent } from '@components/dialog-polls/dialog-polls.component';
import { MaterialModule } from '@shared/material/material.module';
import { PollComponent } from '@pages/poll/poll.component';
import { PollRoutingModule } from '@pages/poll/poll-routing.module';

@NgModule({
  declarations: [PollComponent],
  entryComponents: [DialogPollsComponent],
  imports: [CommonModule, MaterialModule, PollRoutingModule],
})
export class PollModule {}
