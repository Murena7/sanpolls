import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/auth/auth.guard';
import { SanadminComponent } from '@pages/sanadmin/sanadmin.component';
import { StatisticsComponent } from '@pages/sanadmin/statistics/statistics.component';
import { UsersComponent } from '@pages/sanadmin/users/users.component';
import { TransactionsComponent } from '@pages/sanadmin/transactions/transactions.component';

const routes: Routes = [
  {
    path: '',
    component: SanadminComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin']
    },
    children: [
      {
        path: '',
        redirectTo: 'statistics',
        pathMatch: 'full'
      },
      {
        path: 'statistics',
        component: StatisticsComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'transactions',
        component: TransactionsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SanAdminRoutingModule {}
