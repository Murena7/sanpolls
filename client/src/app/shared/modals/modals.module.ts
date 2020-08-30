import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GiveVoteModalComponent } from './give-vote-modal/give-vote-modal.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { EditCommentModalComponent } from './edit-comment-modal/edit-comment-modal.component';

@NgModule({
  declarations: [GiveVoteModalComponent, ConfirmationModalComponent, EditCommentModalComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [],
})
export class ModalsModule {}
