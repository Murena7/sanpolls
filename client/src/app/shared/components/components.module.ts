import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '@components/footer/footer.component';
import { WarnNotificationComponent } from './warn-notification/warn-notification.component';
import { CountdownModule } from '@components/countdown/countdown.module';
import { LikeModule } from '@components/like/like.module';

@NgModule({
  declarations: [FooterComponent, WarnNotificationComponent],
  imports: [CommonModule, CountdownModule, LikeModule],
  exports: [CountdownModule, LikeModule, FooterComponent, WarnNotificationComponent],
})
export class ComponentsModule {}
