import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountdownModule } from 'ngx-countdown';
import { CountdownComponent } from '@components/countdown/countdown.component';

@NgModule({
  declarations: [CountdownComponent],
  imports: [CommonModule, CountdownModule],
  exports: [CountdownComponent],
})
export class MyCountdownModule {}
