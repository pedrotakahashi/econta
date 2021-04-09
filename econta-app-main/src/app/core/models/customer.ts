import { Endereco } from './endereco';
import { BaseModel } from './base-model';
import { InvoiceMap } from './invoice-map';
import { CustomerRole } from './user';

export class Customer extends BaseModel {
  cnpj = '';
  razao = '';
  fantasia = '';
  email = '';
  telefoneFixo = '';
  celular = '';
  plan: number;
  access = '';
  lead = true;
  firstInvoice = '';
  endereco = new Endereco();
  role = CustomerRole.BASIC;
  invoiceMaps?: InvoiceMap[];

}
