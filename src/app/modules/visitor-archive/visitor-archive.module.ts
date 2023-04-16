import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitorArchivePageRoutingModule } from './visitor-archive-routing.module';

import { VisitorArchivePage } from './visitor-archive.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitorArchivePageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    TranslateModule,
  ],
  declarations: [VisitorArchivePage]
})
export class VisitorArchivePageModule { }
