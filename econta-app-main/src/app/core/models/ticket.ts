import { BaseModel } from './base-model';
import { TicketMessage } from './ticket-message';


export class Ticket extends BaseModel {
  customerId = '';
  state = '';
  title = '';
  // subject = '';
  userId = ''; // usuário que criou
  active = true;
  messages: TicketMessage[] = [];
  lastMessage: TicketMessage;
}


export enum TicketStatus {
  OPEN = 'open',
  FINISH = 'finish',
  PROCESSING = 'processing'
}

export const TicketStatusLabel = new Map<string, string>([
  ['open', 'Aberto'],
  ['finish', 'Finalizado'],
  ['processing', 'Em processo']
]);
