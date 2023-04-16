import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProUserPage } from './pro-user.page';

const routes: Routes = [
  {
    path: '',
    component: ProUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProUserPageRoutingModule {}
