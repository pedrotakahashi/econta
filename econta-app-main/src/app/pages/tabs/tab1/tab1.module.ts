import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { RouterModule, Routes } from '@angular/router';
import { FilterComponent } from 'src/app/components/filter/filter.component';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [Tab1Page, FilterComponent]
})
export class Tab1PageModule { }
