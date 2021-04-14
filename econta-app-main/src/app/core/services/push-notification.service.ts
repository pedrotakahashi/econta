import { Injectable } from '@angular/core';
import { PushNotification } from '../models/push-notification';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseAbstract } from './firebase.abstract';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService extends FirebaseAbstract<PushNotification>{
  
  static collectionName = 'push-notifications';

  constructor(
    protected db: AngularFirestore,
  ) {
    super(db, PushNotificationService.collectionName, true);
  }

  setReadNotification(id, read = true) {
    return super.update({id, read});
  }

  getByOwnerIdOrder(id){
    return super.getWhereOrder('ownerId', '==', id,'createdAt','desc')
  }

  getAsyncByOwnerIdOrder(id){
    return super.getAsyncWhereOrder('ownerId', '==', id,'createdAt','desc')
  }
  
}

