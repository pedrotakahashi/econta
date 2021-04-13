import { TabsPageModule } from './../tabs/tabs.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationPageRoutingModule } from './notification-routing.module';

import { NotificationPage } from './notification.page';
import { TabsPage } from '../tabs/tabs.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationPageRoutingModule,
    TabsPageModule
    
  ],
  declarations: [NotificationPage, TabsPage]
})
export class NotificationPageModule {}
