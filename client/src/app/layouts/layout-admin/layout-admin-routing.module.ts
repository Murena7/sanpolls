import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutAdminComponent } from '@layouts/layout-admin/layout-admin.component';
import { AuthGuard } from '@core/auth/auth.guard';
import { NotFoundComponent } from '@pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'san-admin',
    component: LayoutAdminComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin']
    },
    children: [
      {
        path: '',
        canLoad: [AuthGuard],
        data: {
          roles: ['admin']
        },
        loadChildren: () => import('@pages/sanadmin/sanadmin.module').then(m => m.SanAdminModule),
      },
      { path: '**', component: NotFoundComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutAdminRoutingModule {}
