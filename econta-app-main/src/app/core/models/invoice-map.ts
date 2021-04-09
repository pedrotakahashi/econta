import { Endereco } from './endereco';
import { BaseModel } from './base-model';
import { Invoice } from './invoice';

export class InvoiceMap extends BaseModel {
  active = true;
  name = '';
  ownerId = '';
  accountNumber = '';
  lineNumber = '';
  document = '';
  invoiceTypeId = '';
  dueDay: number;

  birthDate = new Date();
  endereco = new Endereco();
  invoices: Invoice[];
}
