import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationPage } from './notification.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationPage
  },

  {
    path:'/view/:id',
    component: NotificationPage
  }
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationPageRoutingModule {}
