import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardVisitorPage } from './dashboard-visitor.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardVisitorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardVisitorPageRoutingModule {}
