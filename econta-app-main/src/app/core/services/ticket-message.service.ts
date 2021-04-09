import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { TicketMessage } from '../models/ticket-message';

import { FirebaseAbstract } from './firebase.abstract';

@Injectable({
  providedIn: 'root'
})
export class TicketMessageService extends FirebaseAbstract<TicketMessage> {
  static collectionName = 'tickets-messages';

  constructor(
      protected db: AngularFirestore
  ) {
    super(db, TicketMessageService.collectionName, true);
  }

  public getAll() {
    return super.getAll();
  }

  public getAllActive() {
    return super.getWhere('active', '==', true);
  }


  public getAllByTicket(id: string) {
    return super.getAsyncWhereOrder('ticketId', '==', id, 'createdAt', 'desc');
  }


  public setActivate(id: string, value: boolean) {
    return super.update({ id, active: value });
  }
}
