import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./modules/welcome/welcome.module').then((m) => m.WelcomePageModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then((m) => m.DashboardPageModule),
      canActivate:[AuthGuard]
  },
  {
    path: 'favourite',
    loadChildren: () => import('./modules/favourite/favourite.module').then(m => m.FavouritePageModule)
  },
  {
    path: 'archive',
    loadChildren: () => import('./modules/archive/archive.module').then(m => m.ArchivePageModule)
  },
  {
    path: 'archive',
    loadChildren: () => import('./modules/archive/archive.module').then(m => m.ArchivePageModule)
  },
  {
    path: 'email-login',
    loadChildren: () => import('./modules/email-login/email-login.module').then( m => m.EmailLoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
