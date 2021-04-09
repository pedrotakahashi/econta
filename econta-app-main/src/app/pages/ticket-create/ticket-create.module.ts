import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketCreatePageRoutingModule } from './ticket-create-routing.module';

import { TicketCreatePage } from './ticket-create.page';
import { InputFormModule } from 'src/app/components/input-form-ionic/input-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InputFormModule,
    ReactiveFormsModule,
    TicketCreatePageRoutingModule,
  ],
  declarations: [TicketCreatePage]
})
export class TicketCreatePageModule {}
