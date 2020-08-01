import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogPollsComponent } from '@components/dialog-polls/dialog-polls.component';
import { MaterialModule } from '@shared/material/material.module';
import { SongComponent } from '@pages/song/song.component';
import { SongRoutingModule } from '@pages/song/song-routing.module';
import { CommentsComponent } from './components/comments/comments.component';
import { SharedModule } from '@shared/shared.module';
import { ChildCommentsComponent } from './components/comments/child-comments/child-comments.component';

@NgModule({
  declarations: [SongComponent, CommentsComponent, ChildCommentsComponent],
  entryComponents: [DialogPollsComponent],
  imports: [CommonModule, MaterialModule, SongRoutingModule, SharedModule]
})
export class SongModule {}
