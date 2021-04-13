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

  private router:Router;
  private activatedRoute: ActivatedRoute;
  list: PushNotification [] = [];
  
  constructor(
    private _authService : AuthSessionService,
    private _push: PushNotificationService,


  ) { }
  async ngOnInit() {
    // const tab = this.activatedRoute.snapshot.paramMap.get('tab');
    
    this.list = await this._push.getWhere('ownerId', '==', (await this._authService.getLoggedUser().ownerId));
    console.log(this.list)
    
    // if(tab){
    //   this.router.navigate()
    // }
  }

}
