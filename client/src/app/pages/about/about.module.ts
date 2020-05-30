import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from '@pages/about/about.component';
import { AboutRoutingModule } from '@pages/about/about-routin.module';

@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule, AboutRoutingModule],
})
export class AboutModule {}
