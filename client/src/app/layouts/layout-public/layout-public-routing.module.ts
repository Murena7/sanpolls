import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPublicComponent } from './layout-public.component';
import { AuthGuard } from '@core/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutPublicComponent,
    children: [
      { path: '', loadChildren: () => import('@pages/home/home.module').then((m) => m.HomeModule) },
      { path: 'polls', loadChildren: () => import('@pages/polls/polls.module').then((m) => m.PollsModule) },
      { path: 'about', loadChildren: () => import('@pages/about/about.module').then((m) => m.AboutModule) },
      { path: 'contacts', loadChildren: () => import('@pages/contacts/contacts.module').then((m) => m.ContactsModule) },
      { path: 'login', loadChildren: () => import('@pages/login/login.module').then((m) => m.LoginModule) },
      {
        path: 'emailcheck',
        loadChildren: () =>
          import('@pages/login/components/email-confirmation/email-confirmation.module').then(
            (m) => m.EmailConfirmationModule
          ),
      },
      {
        path: 'forgotpassword',
        loadChildren: () =>
          import('@pages/login/components/forgotpassword/forgotpassword.module').then((m) => m.ForgotpasswordModule),
      },
      { path: 'poll/:id', loadChildren: () => import('@pages/poll/poll.module').then((m) => m.PollModule) },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        loadChildren: () => import('@pages/profile/profile.module').then((m) => m.ProfileModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutPublicRoutingModule {}
