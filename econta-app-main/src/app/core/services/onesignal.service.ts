import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OnesignalService {

  constructor(
    private oneSignal: OneSignal,
    // private navParams: NavParamsService,
    private root: Router,
    private http: HttpClient,
  ) { }
  initializePush() {
    if (this.isCordovaAvailable() && this.oneSignal) {
      this.oneSignal.startInit('cdbc866b-1c56-4a99-8c32-160f6812821e', environment.firebase.messagingSenderId);
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
      this.oneSignal.handleNotificationReceived().subscribe((res) => {

      });
      this.oneSignal.handleNotificationOpened().subscribe((notification) => {
        let data = notification.notification.payload.additionalData;
        if (data && data.page) {
          // this.navParams.set(data.obj);
          setTimeout(() => {
            this.root.navigateByUrl(data.page);
          }, 1000);
        }
      });


      this.oneSignal.getIds().then(token => {
        localStorage.setItem('registrationToken', token.userId);
      });
      this.oneSignal.endInit();
    }
  }
  isCordovaAvailable = () => {
    if (!(window as any).cordova) {
      return false;
    }
    return true;
  }

  enviarPost(titulo: string, mensagem: string, registro: string, data = null) {
    var noti = null;
    noti = {};
    noti.headings.en = titulo;
    noti.contents.en = mensagem;
    noti.large_icon = "https://camelo-prudente.web.app/assets/images/logo.svg";
    noti.include_player_ids = [registro];
    if (data)
      noti.data = { page: "/chat-message", obj: data };
    const header = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Basic " + noti.Authorization
    });
    this.http.post("https://onesignal.com/api/v1/notifications", noti, { headers: header }).subscribe(
      res => { },
      err => {
        console.log(err);
      }
    );
  }

}
