import { NgModule } from '@angular/core';
import { ProfileComponent } from '@pages/profile/profile.component';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from '@pages/profile/profile-routing.module';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@shared/material/material.module';
import { HistoryComponent } from '@pages/profile/history/history.component';
import { PollsHistoryComponent } from '@pages/profile/polls-history/polls-history.component';
import { MyProfileComponent } from '@pages/profile/my-profile/my-profile.component';
import { PasswordComponent } from './password/password.component';

@NgModule({
  declarations: [ProfileComponent, HistoryComponent, PollsHistoryComponent, MyProfileComponent, PasswordComponent],
  imports: [CommonModule, ProfileRoutingModule, SharedModule, MaterialModule],
})
export class ProfileModule {}
