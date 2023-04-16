import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProUserPageRoutingModule } from './pro-user-routing.module';

import { ProUserPage } from './pro-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProUserPageRoutingModule
  ],
  declarations: [ProUserPage]
})
export class ProUserPageModule {}
