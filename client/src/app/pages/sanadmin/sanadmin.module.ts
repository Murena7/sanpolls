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
import { CreateEditComponent } from './polls/modals/create-edit/create-edit.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';

@NgModule({
  declarations: [SanadminComponent, StatisticsComponent, PollsComponent, TransactionsComponent, CreateEditComponent],
  imports: [CommonModule, SanAdminRoutingModule, SharedModule, NgxDatatableModule, MaterialModule, UsersModule],
  providers: [
    AdminApiService,
    { provide: MAT_DATE_LOCALE, useValue: navigator.language },
    { provide: OWL_DATE_TIME_LOCALE, useValue: navigator.language },
  ],
})
export class SanAdminModule {}
