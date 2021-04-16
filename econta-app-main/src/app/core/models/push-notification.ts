import { BaseModel } from './base-model';

export class PushNotification extends BaseModel {
    message =  '';
    ownerId =  '';
    title = ''
    read =  false;
    readDate :  Date;  
}
