import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogPollsComponent } from './dialog-polls/dialog-polls.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { EditCommentModalComponent } from './edit-comment-modal/edit-comment-modal.component';

@NgModule({
  declarations: [DialogPollsComponent, ConfirmationModalComponent, EditCommentModalComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [],
})
export class ModalsModule {}
