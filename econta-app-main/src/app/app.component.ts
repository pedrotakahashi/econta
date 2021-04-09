import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OnesignalService } from './core/services/onesignal.service';
import { UserService } from './core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _oneginal: OnesignalService,
    private _user: UserService,
    private router: Router,

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this._oneginal.initializePush();
      this.statusBar.styleDefault();
      this._user.getUser().then(res => {
        if (localStorage.getItem('registrationToken')) {
          this._user.update({ id: res.id, token: localStorage.getItem('registrationToken') })
        }
        this.router.navigate(['/tabs'])
        this.splashScreen.hide();
      }).catch(() => {
        this.router.navigate(['/login'])
        this.splashScreen.hide();
      })
    });
  }
}
