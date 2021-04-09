import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

import { FirebaseAbstract } from './firebase.abstract';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends FirebaseAbstract<Customer> {
  static collectionName = 'customers';

  constructor(protected db: AngularFirestore) {
    super(db, CustomerService.collectionName, true);
  }

  public getByCNPJ(cnpj) {
    return super.getWhere('cnpj', '==', cnpj);
  }

  // public async add(data: Customer) {
  //   const doc = await super.add(data);
  //   //const city = data.address && data.address.city ? data.address.city : '';
  //   // const body = { name: data.name, cnpj: data.cnpj, email: data.email, phone: data.phone, city };
  //   return doc;
  // }

  public async update(data: Partial<Customer>) {
    const doc = await super.update(data);
    const city = data.endereco && data.endereco.cidade ? data.endereco.cidade : '';
    return doc;
  }

  async getWhere(field, operator, value): Promise<any> {
    const { docs } = await this.collection().where(field, operator, value).get();

    return docs.map(doc => this.toObject(doc));
  }
}
