import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FaqpageComponent} from './faqpage.component';

const routes: Routes = [
  {
    path: '',
    component: FaqpageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaqpageRoutingModule {}
