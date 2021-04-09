import { BaseModel } from './base-model';

export class Notifications extends BaseModel {
  title = '';
  message = '';
  readed = false;
  forBKO = false;
  userId = '';
  customerId = '';
  redirectTo = '';
  bgColor = 'gray';
  icon = 'far fa-envelope';
}
