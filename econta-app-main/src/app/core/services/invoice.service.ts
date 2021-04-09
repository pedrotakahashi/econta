import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

import { FirebaseAbstract } from './firebase.abstract';
import { Invoice } from '../models/invoice';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends FirebaseAbstract<Invoice> {
  static collectionName = 'invoices';

  constructor(protected db: AngularFirestore) {
    super(db, InvoiceService.collectionName, true);
  }

  public getAllActives(direction: firebase.firestore.OrderByDirection = 'asc') {
    return super.getWhereManyOrderBy([{ field: 'active', operator: '==', value: true }], 'dueDate', direction);
  }

  public async getLast12TotalInvoices(customerId: string, direction: firebase.firestore.OrderByDirection = 'asc'): Promise<{}> {
    let list = await super.getWhere('customerId', '==', customerId);
    let dt = new Date();
    dt.setMonth(-1);
    dt.setDate(1);
    dt.setHours(0, 0, 0, 0);
    var today = new Date();
    var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return list.filter(it => { if (it.dueDate > dt && it.dueDate < lastDayOfMonth) { return it } }).reduce((acc, item) => { var pos = item.dueDate.getMonth(); (acc[pos]) ? acc[pos] += parseFloat('' + item.invoiceAmount) : acc[pos] = parseFloat('' + item.invoiceAmount); return acc }, []);
  }

  public getAllByCustomerId(customerId: string) {
    return super.getWhereOrder('customerId', '==', customerId, 'dueDate', 'desc');

  }

  async getToPay(customerId: string): Promise<Invoice[]> {
    let list = await super.getWhere('customerId', '==', customerId);
    return list.filter(x => { return new Date(x.dueDate).getTime() > new Date().getTime() });
  }
  async getFiveLastMaturityByCustomerId(customerId: string) {
    const date = moment().startOf('day').toDate();

    const { docs } = await this.collection()
      .where('customerId', '==', customerId)
      .where('dueDate', '>=', date)
      .limit(5)
      .orderBy('dueDate', 'desc')
      .get();

    return docs.map(doc => this.toObject(doc));
  }

  public async getAll(orderBy?: string, orderDirection?: firebase.firestore.OrderByDirection): Promise<Invoice[]> {
    if (orderBy) {
      const { docs: sortedDocuments } = await this.collection().orderBy(orderBy, orderDirection).get();
      return sortedDocuments.map(doc => this.toObject(doc));
    }

    const { docs } = await this.collection().get();
    return docs.map(doc => this.toObject(doc));
  }

  public getAllPaid() {
    return super.getWhere('paid', '==', true);
  }

  public toObject(document: firebase.firestore.DocumentData): Invoice {
    const data = { id: document.id, ...document.data() };

    data.createdAt = data.createdAt ? data.createdAt.toDate() : null;
    data.updatedAt = data.updatedAt ? data.updatedAt.toDate() : null;
    data.dueDate = data.dueDate ? data.dueDate.toDate() : null;

    return data;
  }


  public async getMonths(
    date1 = new Date(),
    date2 = new Date(),
    orderDirection?: firebase.firestore.OrderByDirection

  ): Promise<Invoice[]> {

    let list = super.getWhereManyOrderBy(
      [
        { field: 'dueDate', operator: '>=', value: date1 },
        { field: 'dueDate', operator: '<=', value: date2 }
      ],
      'dueDate',
      orderDirection
    );

    return list
  }

  public async getLastSixMonths(
    accountNumberId: string,
    orderDirection?: firebase.firestore.OrderByDirection
  ): Promise<Invoice[]> {
    let date = new Date();
    let dateSix = new Date();
    dateSix.setMonth(dateSix.getMonth() - 6);
    let list = super.getWhereManyOrderBy(
      [
        { field: 'dueDate', operator: '>=', value: dateSix },
        { field: 'dueDate', operator: '<=', value: date }
      ],
      'dueDate',
      orderDirection
    );

    return (await list).filter(item => {
      return item.accountNumberId.includes(accountNumberId);
    });
  }
}
