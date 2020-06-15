import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '@pages/profile/profile.component';
import { PollsHistoryComponent } from '@pages/profile/polls-history/polls-history.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'polls-history', component: PollsHistoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
