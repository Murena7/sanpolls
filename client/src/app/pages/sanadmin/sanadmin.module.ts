import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SanAdminRoutingModule } from './sanadmin-routing.module';
import { SanadminComponent } from './sanadmin.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { PollsComponent } from './polls/polls.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { SharedModule } from '@shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MaterialModule } from '@shared/material/material.module';
import { AdminApiService } from '@core/api-services/admin-api.service';
import { UsersModule } from '@pages/sanadmin/users/users.module';

@NgModule({
  declarations: [SanadminComponent, StatisticsComponent, PollsComponent, TransactionsComponent],
  imports: [CommonModule, SanAdminRoutingModule, SharedModule, NgxDatatableModule, MaterialModule, UsersModule],
  providers: [AdminApiService]
})
export class SanAdminModule {}
