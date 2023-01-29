import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { EmailLoginPageRoutingModule } from "./email-login-routing.module";

import { EmailLoginPage } from "./email-login.page";
import { ComponentsModule } from "src/app/components/shared.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailLoginPageRoutingModule,
    ComponentsModule,
    TranslateModule,
  ],
  declarations: [EmailLoginPage],
})
export class EmailLoginPageModule {}
