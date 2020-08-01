import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogPollsComponent } from '@components/dialog-polls/dialog-polls.component';
import { MaterialModule } from '@shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DialogPollsComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [],
})
export class DialogPollsModule {}
