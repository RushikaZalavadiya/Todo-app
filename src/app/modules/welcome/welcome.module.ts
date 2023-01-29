import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { WelcomePageRoutingModule } from "./welcome-routing.module";
import { ComponentsModule } from "src/app/components/shared.module";
import { WelcomePage } from "./welcome.page";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomePageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    TranslateModule,
  ],
  declarations: [WelcomePage],
})
export class WelcomePageModule {}
