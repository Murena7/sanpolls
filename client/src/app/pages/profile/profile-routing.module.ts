import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '@pages/profile/profile.component';
import { HistoryComponent } from '@pages/profile/history/history.component';
import { MyProfileComponent } from '@pages/profile/my-profile/my-profile.component';
import { PollsHistoryComponent } from '@pages/profile/polls-history/polls-history.component';
import { PasswordComponent } from '@pages/profile/password/password.component';
import { AuthGuard } from '@core/auth/auth.guard';
import { MyVoicesComponent } from './my-voices/my-voices.component';
import { RefillComponent } from './refill/refill.component';
import { PollTransactionHistoryComponent } from './poll-transaction-history/poll-transaction-history.component';

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
      { path: 'my-voices', component: MyVoicesComponent },
      { path: 'refill', component: RefillComponent },
      { path: 'voice-history', component: PollTransactionHistoryComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
