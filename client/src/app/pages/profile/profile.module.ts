import { NgModule } from '@angular/core';
import { ProfileComponent } from '@pages/profile/profile.component';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from '@pages/profile/profile-routing.module';
import { PollsHistoryComponent } from './polls-history/polls-history.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [ProfileComponent, PollsHistoryComponent],
  imports: [CommonModule, ProfileRoutingModule, SharedModule],
})
export class ProfileModule {}
