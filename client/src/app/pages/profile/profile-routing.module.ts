import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '@pages/profile/profile.component';
import { HistoryComponent } from '@pages/profile/history/history.component';
import { MyProfileComponent } from '@pages/profile/my-profile/my-profile.component';
import { PollsHistoryComponent } from '@pages/profile/polls-history/polls-history.component';
import { PasswordComponent } from '@pages/profile/password/password.component';
import { AuthGuard } from '@core/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ProfileComponent,
    children: [
      { path: '', component: MyProfileComponent },
      { path: 'polls-history', component: PollsHistoryComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'password', component: PasswordComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
