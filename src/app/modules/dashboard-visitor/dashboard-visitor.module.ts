import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardVisitorPageRoutingModule } from './dashboard-visitor-routing.module';

import { DashboardVisitorPage } from './dashboard-visitor.page';
import { ComponentsModule } from 'src/app/components/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardVisitorPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [DashboardVisitorPage]
})
export class DashboardVisitorPageModule { }
