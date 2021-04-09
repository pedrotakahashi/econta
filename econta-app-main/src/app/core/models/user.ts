import { BaseModel } from './base-model';

export class User extends BaseModel {
  name = '';
  ownerId = '';
  celular = '';
  email = '';
  token:string;
  role = CustomerRole.BASIC;
  active = true;
}


export enum CustomerRole {
  ADMIN = 'admin',
  BKO = 'backoffice',
  SUPER = 'econta-super',
  BASIC = 'econta-basico',
}

export const CustomerRoleLabel = new Map<string, string>([
  ['admin', 'Administrador'],
  ['bko', 'Backoffice'],
  ['econta-super', 'Econta SUPER'],
  ['econta-basico', 'Econta BÁSICO']
]);
