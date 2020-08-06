import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FaqpageComponent} from './faqpage.component';
import {FaqpageRoutingModule} from './faqpage-routing.module';
import {MaterialModule} from '../../shared/material/material.module';

@NgModule({
  declarations: [FaqpageComponent],
  imports: [CommonModule, FaqpageRoutingModule, MaterialModule],
})
export class FaqpageModule {}
