import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '@components/footer/footer.component';
import { WarnNotificationComponent } from './warn-notification/warn-notification.component';
import { CountdownModule } from '@components/countdown/countdown.module';
import { LikeModule } from '@components/like/like.module';
import { DataTablePagerComponent } from './datatable-pager/datatable-pager.component';

@NgModule({
  declarations: [FooterComponent, WarnNotificationComponent, DataTablePagerComponent],
  imports: [CommonModule, CountdownModule, LikeModule],
  exports: [CountdownModule, LikeModule, FooterComponent, WarnNotificationComponent, DataTablePagerComponent],
})
export class ComponentsModule {}
