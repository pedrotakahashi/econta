import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Notifications } from '../models/notification';

import { FirebaseAbstract } from './firebase.abstract';



@Injectable({
  providedIn: 'root'
})
export class NotificationService extends FirebaseAbstract<Notifications> {

  static collectionName = 'notifications';

  constructor(
    protected db: AngularFirestore,
  ) {
    super(db, NotificationService.collectionName, true);
  }

  setReadNotification(id, readed = true) {
    return super.update({id, readed});
  }

  getAllUnreaded() {
    return super.getWhereOrder('readed', '==', false, 'createdAt', 'asc');
  }

  getAllUnreadedForBKO() {
    return super.getWhereManyOrderBy([
      { field: 'readed', operator: '==', value: false },
      { field: 'forBKO', operator: '==', value: true }
    ], 'createdAt', 'asc');
  }

  getAsyncAllUnreadedForBKO() {
    return super.getAsyncWhereMany([
      { field: 'readed', operator: '==', value: false },
      { field: 'forBKO', operator: '==', value: true }
    ]);
  }

  getAllByCustomerId(customerId) {
    return super.getWhereOrder('customerId', '==', customerId, 'createdAt', 'asc');
  }

  getAllUnreadedByCustomerId(customerId) {
    return super.getWhereManyOrderBy([
      { field: 'readed', operator: '==', value: false },
      { field: 'customerId', operator: '==', value: customerId },
      { field: 'forBKO', operator: '==', value: false }
    ], 'createdAt', 'asc');
  }

  getAsyncAllUnreadedByCustomerId(customerId) {
    return super.getAsyncWhereMany([
      { field: 'readed', operator: '==', value: false },
      { field: 'customerId', operator: '==', value: customerId },
      { field: 'forBKO', operator: '==', value: false }
    ]);
  }
}
