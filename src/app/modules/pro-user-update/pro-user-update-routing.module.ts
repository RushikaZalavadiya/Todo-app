import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProUserUpdatePage } from './pro-user-update.page';

const routes: Routes = [
  {
    path: '',
    component: ProUserUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProUserUpdatePageRoutingModule {}
