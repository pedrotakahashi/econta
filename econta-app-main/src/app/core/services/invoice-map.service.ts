import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

import { FirebaseAbstract } from './firebase.abstract';
import { InvoiceMap } from '../models/invoice-map';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class InvoiceMapService extends FirebaseAbstract<InvoiceMap> {

  static collectionName = 'invoices-map';

  constructor(
    protected db: AngularFirestore,
  ) {
    super(db, InvoiceMapService.collectionName, true);
  }

  // public getAllActives(direction: firebase.firestore.OrderByDirection = 'asc') {
  //   return super.getWhereManyOrderBy([
  //     { field: 'active', operator: '==', value: true }
  //   ], 'dueDate', direction);
  // }



  // public getAllByCustomerId(customerId: string) {
  //   if (customerId) {
  //     return super.getWhere('customerId', '==', customerId);
  //   } else {
  //     return super.getWhere('customerId', '>=', '');
  //   }
  // }



  // public async getAll(orderBy?: string, orderDirection?: firebase.firestore.OrderByDirection): Promise<InvoiceMap[]> {
  //   if (orderBy) {
  //     const { docs: sortedDocuments } = await this.collection().orderBy(orderBy, orderDirection).get();
  //     return sortedDocuments.map(doc => this.toObject(doc));
  //   }

  //   const { docs } = await this.collection().get();
  //   return docs.map(doc => this.toObject(doc));
  // }

  // public toObject(document: firebase.firestore.DocumentData): InvoiceMap {
  //   const data = { id: document.id, ...document.data() };

  //   data.createdAt = data.createdAt ? data.createdAt.toDate() : null;
  //   data.updatedAt = data.updatedAt ? data.updatedAt.toDate() : null;
  //   data.dueDate = data.dueDate ? data.dueDate.toDate() : null;

  //   return data;
  // }
}
