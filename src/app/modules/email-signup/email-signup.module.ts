import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailSignupPageRoutingModule } from './email-signup-routing.module';

import { EmailSignupPage } from './email-signup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailSignupPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EmailSignupPage]
})
export class EmailSignupPageModule { }
