import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitorFavouritePageRoutingModule } from './visitor-favourite-routing.module';

import { VisitorFavouritePage } from './visitor-favourite.page';
import { ComponentsModule } from 'src/app/components/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitorFavouritePageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    TranslateModule,
  ],
  declarations: [VisitorFavouritePage]
})
export class VisitorFavouritePageModule { }
