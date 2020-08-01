import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountdownComponent } from '@components/countdown/countdown.component';
import { NgxSimpleCountdownModule } from '@shared/directives/countdown/ngx-simple-countdown.module';

@NgModule({
  declarations: [CountdownComponent],
  imports: [CommonModule, NgxSimpleCountdownModule],
  exports: [CountdownComponent],
})
export class CountdownModule {}
