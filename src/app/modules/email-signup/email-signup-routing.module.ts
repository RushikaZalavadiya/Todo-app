import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailSignupPage } from './email-signup.page';

const routes: Routes = [
  {
    path: '',
    component: EmailSignupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailSignupPageRoutingModule {}
