import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ArchivePageRoutingModule } from "./archive-routing.module";

import { ArchivePage } from "./archive.page";
import { ComponentsModule } from "src/app/components/shared.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArchivePageRoutingModule,
    ComponentsModule,
    TranslateModule,
  ],
  declarations: [ArchivePage],
})
export class ArchivePageModule {}
