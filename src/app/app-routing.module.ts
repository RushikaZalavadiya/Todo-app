import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
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
    // canActivate: [AuthGuard]
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
    loadChildren: () => import('./modules/email-login/email-login.module').then(m => m.EmailLoginPageModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./modules/landing/landing.module').then(m => m.LandingPageModule)
  },
  // {
  //   path: 'admin/login',
  //   loadChildren: () => import('./modules/admin/login/login.module').then(m => m.LoginPageModule)
  // },
  {
    path: 'admin/dashboard',
    loadChildren: () => import('./modules/admin/dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'email-signup',
    loadChildren: () => import('./modules/email-signup/email-signup.module').then(m => m.EmailSignupPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },

  {
    path: 'admin/user',
    loadChildren: () => import('./modules/admin/user/user.module').then(m => m.UserPageModule)
  },  {
    path: 'profile',
    loadChildren: () => import('./modules/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'update',
    loadChildren: () => import('./modules/update/update.module').then( m => m.UpdatePageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
