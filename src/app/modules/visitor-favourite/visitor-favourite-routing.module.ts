import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitorFavouritePage } from './visitor-favourite.page';

const routes: Routes = [
  {
    path: '',
    component: VisitorFavouritePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitorFavouritePageRoutingModule {}
