import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogPollsComponent } from '@components/dialog-polls/dialog-polls.component';
import { MaterialModule } from '@shared/material/material.module';

@NgModule({
  declarations: [DialogPollsComponent],
  imports: [CommonModule, MaterialModule],
  exports: [],
})
export class DialogPollsModule {}
