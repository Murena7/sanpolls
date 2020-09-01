import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPublicComponent } from './layout-public.component';
import { AuthGuard } from '@core/auth/auth.guard';
import { NotFoundComponent } from '@pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPublicComponent,
    children: [
      { path: '', loadChildren: () => import('@pages/home/home.module').then(m => m.HomeModule) },
      { path: 'polls', loadChildren: () => import('@pages/polls/polls.module').then(m => m.PollsModule) },
      { path: 'about', loadChildren: () => import('@pages/about/about.module').then(m => m.AboutModule) },
      { path: 'contacts', loadChildren: () => import('@pages/contacts/contacts.module').then(m => m.ContactsModule) },
      { path: 'faqpage', loadChildren: () => import('@pages/faqpage/faqpage.module').then(m => m.FaqpageModule) },
      { path: 'login', loadChildren: () => import('@pages/login/login.module').then(m => m.LoginModule) },
      { path: 'song/:id', loadChildren: () => import('@pages/song/song.module').then(m => m.SongModule) },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        loadChildren: () => import('@pages/profile/profile.module').then(m => m.ProfileModule),
      },
      { path: '**', component: NotFoundComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutPublicRoutingModule {}
