import { BaseModel } from './base-model';

export class TicketMessage extends BaseModel {
  ticketId: string;
  message = '';
  userId = '';
  createDate = new Date();
}
