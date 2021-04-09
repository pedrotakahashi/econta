import { BaseModel } from './base-model';

export class Invoice extends BaseModel {
  active = true;

  invoiceMapId = '';
  accountNumber = '';

  
  accountNumberId = '';
  companyName = '';
  customerId = '';
  document = '';
  documentCompany = '';
  dueDate = new Date();
  invoiceAmount = 0.0;
  invoiceType = '';
  operatorName = '';
  fileLink = '';
  fileName:string;
  paid = false;
}
