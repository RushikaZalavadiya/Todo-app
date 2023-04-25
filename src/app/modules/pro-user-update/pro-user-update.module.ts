import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProUserUpdatePageRoutingModule } from './pro-user-update-routing.module';

import { ProUserUpdatePage } from './pro-user-update.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProUserUpdatePageRoutingModule,
    TranslateModule
  ],
  declarations: [ProUserUpdatePage]
})
export class ProUserUpdatePageModule { }
