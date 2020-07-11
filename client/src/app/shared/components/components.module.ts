import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCountdownModule } from '@components/countdown/countdown.module';
import { DialogPollsModule } from '@components/dialog-polls/dialog-polls.module';
import { FooterComponent } from '@components/footer/footer.component';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, MyCountdownModule, DialogPollsModule],
  exports: [MyCountdownModule, DialogPollsModule, FooterComponent]
})
export class ComponentsModule {}
