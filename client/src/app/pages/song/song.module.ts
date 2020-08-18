import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogPollsComponent } from '@components/../../shared/modals/dialog-polls/dialog-polls.component';
import { MaterialModule } from '@shared/material/material.module';
import { SongComponent } from '@pages/song/song.component';
import { SongRoutingModule } from '@pages/song/song-routing.module';
import { CommentsComponent } from './components/comments/comments.component';
import { SharedModule } from '@shared/shared.module';
import { CommentComponent } from './components/comment/comment.component';
import { TextareaFormComponent } from './components/textarea-form/textarea-form.component';
import { CommentBodyComponent } from './components/comment-body/comment-body.component';

@NgModule({
  declarations: [SongComponent, CommentsComponent, CommentComponent, TextareaFormComponent, CommentBodyComponent],
  entryComponents: [DialogPollsComponent],
  imports: [CommonModule, MaterialModule, SongRoutingModule, SharedModule]
})
export class SongModule {}
