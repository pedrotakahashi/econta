import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketCreatePage } from './ticket-create.page';

const routes: Routes = [
  {
    path: '',
    component: TicketCreatePage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketCreatePageRoutingModule {}
