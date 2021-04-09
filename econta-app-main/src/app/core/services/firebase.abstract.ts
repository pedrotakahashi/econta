import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { DocumentNotFoundError } from '../exceptions/document-not-found-error';
import { BaseModel } from '../models/base-model';

export abstract class FirebaseAbstract<T extends BaseModel> {

  constructor(
    protected db: AngularFirestore,
    protected collectionName: string,
    protected seeTimestamp: boolean = true,
    protected hasTimestamp: boolean = true
  ) {}

  public add(data: T) {
    const doc = this.cloneObject(data);
    if (this.seeTimestamp) {
      doc.createdAt = this.timestamp;
      doc.updatedAt = null;
    }
    delete doc.id;
    if (doc.cnpj) {
      return this.collection().doc(doc.cnpj).set(doc);
    } else {
      return this.collection().add(doc);
    }
  }

  public update(data: Partial<T>) {
    const doc = this.cloneObject(data);
    if (this.seeTimestamp) {
      doc.updatedAt = this.timestamp;
      delete doc.createdAt;
    }
    delete doc.id;
    return this.collection().doc(data.id).update(doc);
  }

  public async save(item: T) {
    if (!item.id) {
      return this.add(item);
    }

    return this.update(item);
  }

  public set(data: T) {
    const doc = this.cloneObject(data);
    if (this.seeTimestamp) {
      doc.createdAt = this.timestamp;
      doc.updatedAt = null;
    }
    delete doc.id;

    return this.collection().doc(data.id).set(doc);
  }

  public delete(id: string) {
    return this.collection().doc(id).delete();
  }

  public async getById(id: string): Promise<T> {
    const doc = await this.collection().doc(id).get();
    if (!doc.exists) {
      throw new DocumentNotFoundError(`Document ${id} was not found.`);
    }

    return this.toObject(doc);
  }

  public getAsyncById(id: string): Observable<T> {
    return this.db
      .doc<T>(`${this.collectionName}/${id}`)
      .snapshotChanges()
      .pipe(map(({ payload }) => (payload.exists ? this.toObject(payload) : null)));
  }

  public async getAll(orderBy?: string, orderDirection?: firebase.firestore.OrderByDirection): Promise<T[]> {
    if (orderBy) {
      const { docs: sortedDocuments } = await this.collection().orderBy(orderBy, orderDirection).get();
      return sortedDocuments.map(doc => this.toObject(doc));
    }

    const { docs } = await this.collection().get();
    return docs.map(doc => this.toObject(doc));
  }

  protected getAsyncAll(
    orderBy?: string,
    orderDirection?: firebase.firestore.OrderByDirection
  ): Observable<DocumentObservable<T>[]> {
    return this.db
      .collection<T>(this.collectionName, ref => (orderBy ? ref.orderBy(orderBy, orderDirection) : ref))
      .stateChanges()
      .pipe(
        map(data =>
          data.map(({ type, payload: { doc, newIndex, oldIndex } }) => ({
            type,
            newIndex,
            oldIndex,
            data: this.toObject(doc)
          }))
        )
      );
  }

  public async getWhere(field, operator, value): Promise<T[]> {
    const { docs } = await this.collection().where(field, operator, value).get();

    return docs.map(doc => this.toObject(doc));
  }

  protected async getWhereOrder(
    field, operator, value,
    order: string = null,
    direction: firebase.firestore.OrderByDirection = 'asc'
  ): Promise<T[]> {
    const { docs } = order ?
      await this.collection().where(field, operator, value).orderBy(order, direction).get() :
      await this.collection().where(field, operator, value).get();

    return docs.map(doc => this.toObject(doc));
  }

  protected getAsyncWhereOrder(
    field: string,
    operator: FirebaseQueryOperator,
    value: any,
    order: string = null,
    direction: firebase.firestore.OrderByDirection = 'asc'
  ): Observable<DocumentObservable<T>[]> {
    return this.db
      .collection<T>(this.collectionName, ref => ref.where(field, operator, value).orderBy(order,direction))
      .stateChanges()
      .pipe(
        map(data =>
          data.map(({ type, payload: { doc, newIndex, oldIndex } }) => ({
            type,
            newIndex,
            oldIndex,
            data: this.toObject(doc)
          }))
        )
      );
  }

  protected getAsyncWhere(
    field: string,
    operator: FirebaseQueryOperator,
    value: any
  ): Observable<DocumentObservable<T>[]> {
    return this.db
      .collection<T>(this.collectionName, ref => ref.where(field, operator, value))
      .stateChanges()
      .pipe(
        map(data =>
          data.map(({ type, payload: { doc, newIndex, oldIndex } }) => ({
            type,
            newIndex,
            oldIndex,
            data: this.toObject(doc)
          }))
        )
      );
  }

  protected async getWhereMany(filters: FirebaseWhere[]): Promise<T[]> {
    let query = this.collection().where(filters[0].field, filters[0].operator, filters[0].value);

    filters.splice(0, 1);

    for (const filter of filters) {
      query = query.where(filter.field, filter.operator, filter.value);
    }

    const { docs } = await query.get();
    return docs.map(doc => this.toObject(doc));
  }

  protected async getWhereManyOrderBy(
      filters: FirebaseWhere[],
      orderField: string,
      direction: firebase.firestore.OrderByDirection
  ): Promise<T[]> {
    let query = this.collection().where(filters[0].field, filters[0].operator, filters[0].value);

    filters.splice(0, 1);

    for (const filter of filters) {
      query = query.where(filter.field, filter.operator, filter.value);
    }

    const { docs } = await query.orderBy(orderField, direction).get();
    return docs.map(doc => this.toObject(doc));
  }

  protected getAsyncWhereMany(filters: FirebaseWhere[]): Observable<DocumentObservable<T>[]> {
    return this.db
      .collection<T>(this.collectionName, ref => {
        let query = ref.where(filters[0].field, filters[0].operator, filters[0].value);

        filters.splice(0, 1);

        for (const filter of filters) {
          query = query.where(filter.field, filter.operator, filter.value);
        }

        return query;
      })
      .stateChanges()
      .pipe(
        map(data =>
          data.map(({ type, payload: { doc, newIndex, oldIndex } }) => ({
            type,
            newIndex,
            oldIndex,
            data: this.toObject(doc)
          }))
        )
      );
  }

  protected collection() {
    return this.db.firestore.collection(this.collectionName);
  }

  protected get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  protected toObject(document: firebase.firestore.DocumentData): T {
    let data = { id: document.id, ...document.data() };

    if (this.hasTimestamp) {
      data = this.transformTimestampToDate(data);
    }

    return data;
  }

  private transformTimestampToDate(obj) {
    if (null == obj || 'object' !== typeof obj) {
      return obj;
    }

    if (obj instanceof firebase.firestore.Timestamp) {
      return obj.toDate();
    }

    let copy;

    if (obj instanceof Array) {
      copy = [];
      for (let i = 0, len = obj.length; i < len; i++) {
        copy[i] = this.transformTimestampToDate(obj[i]);
      }
      return copy;
    }

    if (obj instanceof Object) {
      copy = {};
      for (const attr in obj) {
        if (obj.hasOwnProperty(attr)) {
          copy[attr] = this.transformTimestampToDate(obj[attr]);
        }
      }

      return copy;
    }

    throw new Error('The object could not be transformed! Type is not supported.');
  }

  protected cloneObject(obj) {
    let copy;
    if (null == obj || 'object' !== typeof obj) {
      return obj;
    }

    if (obj instanceof firebase.firestore.FieldValue) {
      return obj;
    }

    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    if (obj instanceof Array) {
      copy = [];
      for (let i = 0, len = obj.length; i < len; i++) {
        copy[i] = this.cloneObject(obj[i]);
      }
      return copy;
    }

    if (obj instanceof Object) {
      copy = {};
      for (const attr in obj) {
        if (obj.hasOwnProperty(attr)) {
          copy[attr] = this.cloneObject(obj[attr]);
        }
      }

      for (const prop in copy) {
        if (copy[prop] === undefined) {
          delete copy[prop];
        }
      }

      return copy;
    }

    throw new Error('The object could not be copied! Type is not supported.');
  }
}

type FirebaseQueryOperator = '<' | '<=' | '==' | '>=' | '>' | 'array-contains';

interface FirebaseWhere {
  field: string;
  operator: FirebaseQueryOperator;
  value: any;
}

interface DocumentObservable<T> {
  type: 'added' | 'removed' | 'modified';
  newIndex: number;
  oldIndex: number;
  data: T;
}
