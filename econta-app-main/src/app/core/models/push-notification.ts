import { BaseModel } from './base-model';

export class PushNotification extends BaseModel {
    message =  '';
    ownerId =  '';
    read =  false;
    readDate =  null;
}
