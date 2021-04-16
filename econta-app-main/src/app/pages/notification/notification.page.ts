import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PushNotification } from 'src/app/core/models/push-notification';
import { AuthSessionService } from 'src/app/core/services/auth-session.service';
import { PushNotificationService } from 'src/app/core/services/push-notification.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  item = new PushNotification()
  
  
  constructor(
    private _push: PushNotificationService,
    private activatedRoute: ActivatedRoute,


  ) { }
  async ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) {
      const doc = await this._push.getById(id);
      if(doc){
        this.item = doc;
      }
    }
   }

}
