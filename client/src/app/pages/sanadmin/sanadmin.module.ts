import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SanAdminRoutingModule } from './sanadmin-routing.module';
import { SanadminComponent } from './sanadmin.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { UsersComponent } from './users/users.component';
import { PollsComponent } from './polls/polls.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { SharedModule } from '@shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MaterialModule } from '@shared/material/material.module';
import { AdminApiService } from '@core/api-services/admin-api.service';

@NgModule({
  declarations: [SanadminComponent, StatisticsComponent, UsersComponent, PollsComponent, TransactionsComponent],
  imports: [CommonModule, SanAdminRoutingModule, SharedModule, NgxDatatableModule, MaterialModule],
  providers: [AdminApiService]
})
export class SanAdminModule {}
