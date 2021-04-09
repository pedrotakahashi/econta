import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Ticket } from '../models/ticket';

import { FirebaseAbstract } from './firebase.abstract';

@Injectable({
  providedIn: 'root'
})
export class TicketService extends FirebaseAbstract<Ticket> {
  static collectionName = 'tickets';

  constructor(protected db: AngularFirestore) {
    super(db, TicketService.collectionName, true);
  }

  public getAll(order) {
    return super.getAll(order,'desc');
  }

  public getAllActive() {
    return super.getWhere('active', '==', true);
  }

  public getAllByCustomer(userId: string) {
    return super.getWhereOrder('customerId', '==', userId, 'createdAt', 'desc');
  }
  public getAllByUser(userId: string) {
    return super.getWhereOrder('userId', '==', userId, 'createdAt', 'desc');
  }

  public setActivate(id: string, value: boolean) {
    return super.update({ id, active: value });
  }

  public async getFiveLastByCustomerId(userId: string) {
    const { docs } = await this.collection()
      .where('customerId', '==', userId)
      .limit(5)
      .orderBy('lastMessage.createDate', 'desc')
      .get();

    return docs.map(doc => this.toObject(doc));
  }
}
