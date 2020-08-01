import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SongComponent } from '@pages/song/song.component';

const routes: Routes = [
  {
    path: '',
    component: SongComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SongRoutingModule {}
