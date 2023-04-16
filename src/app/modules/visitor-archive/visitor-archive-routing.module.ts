import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitorArchivePage } from './visitor-archive.page';

const routes: Routes = [
  {
    path: '',
    component: VisitorArchivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitorArchivePageRoutingModule {}
