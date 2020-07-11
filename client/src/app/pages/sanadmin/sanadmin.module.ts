import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SanAdminRoutingModule } from './sanadmin-routing.module';
import { SanadminComponent } from './sanadmin.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { UsersComponent } from './users/users.component';
import { PollsComponent } from './polls/polls.component';
import { TransactionsComponent } from './transactions/transactions.component';

@NgModule({
  declarations: [SanadminComponent, StatisticsComponent, UsersComponent, PollsComponent, TransactionsComponent],
  imports: [CommonModule, SanAdminRoutingModule]
})
export class SanAdminModule {}
