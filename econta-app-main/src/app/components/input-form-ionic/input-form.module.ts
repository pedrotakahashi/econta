import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputFormComponent } from './input-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [InputFormComponent],
  exports: [InputFormComponent],
  providers: [
  ]
})
export class InputFormModule { }
