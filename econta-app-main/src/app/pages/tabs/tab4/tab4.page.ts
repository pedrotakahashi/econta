import { AuthenticationService } from './../../../core/services/authentication.service';
import { PushNotificationService } from './../../../core/services/push-notification.service';
import { Component, OnInit } from '@angular/core';
import { PushNotification } from 'src/app/core/models/push-notification';
import { UserService } from 'src/app/core/services/user.service';
import { AuthSessionService } from 'src/app/core/services/auth-session.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
   list: PushNotification [] = [];

  // listFull:PushNotification [] = [];
  constructor(
    private _push: PushNotificationService,
    private _user: UserService,
    private _auth: AuthenticationService,
    private _authService : AuthSessionService,
    private router: Router,

  ) { }

  async ngOnInit() {
   await this.loadList()
  
  }

  async loadList(){
    this.list = await this._push.getWhere('ownerId', '==', (await this._authService.getLoggedUser().ownerId));
    
    console.log(this.list)

    
  }
    async updateStatus(valor: PushNotification){
      
      console.log(valor)
      if(!valor.read){
        valor.readDate = new Date();
        valor.read = true;
        await this._push.update(valor)
      }
      
      this.router.navigate(['/notification'])

    }

    

}
