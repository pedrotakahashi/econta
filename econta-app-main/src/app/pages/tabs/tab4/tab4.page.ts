import { UserService } from './../../../core/services/user.service';
import { PushNotificationService } from './../../../core/services/push-notification.service';
import { Component, OnInit } from '@angular/core';
import { PushNotification } from 'src/app/core/models/push-notification';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  list: PushNotification [] = [];
  listFull:PushNotification [] = [];
  constructor(
  private _pushNotification =  PushNotificationService,
  private _user = UserService,
  ) { }

  ngOnInit() {
  }

  async loadList(){
    
  }
}
