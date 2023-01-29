import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { FavouritePageRoutingModule } from "./favourite-routing.module";

import { FavouritePage } from "./favourite.page";
import { ComponentsModule } from "src/app/components/shared.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavouritePageRoutingModule,
    ComponentsModule,
    TranslateModule,
  ],
  declarations: [FavouritePage],
})
export class FavouritePageModule {}
