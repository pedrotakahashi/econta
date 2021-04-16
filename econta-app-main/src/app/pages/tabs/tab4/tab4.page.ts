import { User } from './../../../core/models/user';
import { AuthenticationService } from './../../../core/services/authentication.service';
import { PushNotificationService } from './../../../core/services/push-notification.service';
import { Component, NgZone, OnInit } from '@angular/core';
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
   user = new User();

  constructor(
    private _push: PushNotificationService,
    private _user: UserService,
    private _auth: AuthenticationService,
    private _authService : AuthSessionService,
    private router: Router,
    private ngZone: NgZone,

  ) { }

  async ngOnInit() {
    this.user = this._authService.getLoggedUser();
    this.asyncLoadList();

  }
  //EOF

  async loadList(){
    this.list = await this._push.getByOwnerIdOrder(this.user.ownerId);
    console.log(this.list)
  }
  //EOF

  asyncLoadList(){
    this._push.getAsyncByOwnerIdOrder(this.user.ownerId).subscribe((docs) =>{
      this.ngZone.run(() =>{
        for (const res of docs) {
          const { data, type } = res;
          if (type === 'added') {
            this.list.push(data);
          } else if (type === 'modified') {
            const pos = this.list.findIndex(m => m.id === data.id);
            if (pos > -1) {
              this.list[pos] = data;
            }
          }
        }
        this.list.sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1));  
      })

    });
    console.log(this.list)
  }
  //EOF

     updateStatus(valor: PushNotification){
      console.log(valor)
      if(!valor.read){
        valor.readDate = new Date();
        valor.read = true;
         this._push.update(valor)
      }
      
      this.router.navigate(['/notification/view', valor.id])
  /*path:'/view/:id',*/
    }
    //EOF
    

}
