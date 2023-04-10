import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailSignupPageRoutingModule } from './email-signup-routing.module';

import { EmailSignupPage } from './email-signup.page';
import { ComponentsModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailSignupPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [EmailSignupPage]
})
export class EmailSignupPageModule { }
