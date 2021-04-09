import { BaseModel } from './base-model';

export class SacItem {
  status = true;
  protocol = '';
  description = '';
  fromUserId = '';
  toUserId = '';
  createdAt = new Date();
}

export class Sac extends BaseModel {
  customerId = '';
  type = '';
  source = '';
  priority = false;
  title = '';
  description = '';
  createdUserId = '';
  lastUserId = '';
  status = '';
  items: SacItem[] = [];
  closeDate: Date = null;
}
