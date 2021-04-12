import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab4Page } from './tab4.page';
import { RouterModule, Routes } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';



const routes: Routes = [
  {
    path: '',
    component: Tab4Page,
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgxMaskModule
    
  ],
  declarations: [Tab4Page]
})
export class Tab4PageModule { }
