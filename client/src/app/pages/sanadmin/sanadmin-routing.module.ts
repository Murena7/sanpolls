import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/auth/auth.guard';
import { SanadminComponent } from '@pages/sanadmin/sanadmin.component';
import { StatisticsComponent } from '@pages/sanadmin/statistics/statistics.component';

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
        component: StatisticsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SanAdminRoutingModule {}
