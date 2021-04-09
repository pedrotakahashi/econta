import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { GenericValidator } from 'src/app/components/input-form-ionic/generic-validator';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loading = false;
  submitted = false;
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _auth: AuthenticationService,
    private _user: UserService,
    private router: Router,
    private alertController: AlertController,
    private splashScreen: SplashScreen,
    // private diag: Diagnostic,
    private platform: Platform
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required, GenericValidator.EMAIL]],
      password: [null, [Validators.required]]
    });
  }

  ionViewWillEnter() {
    this.splashScreen.hide();
  }

  async login() {
    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }

    this.loading = true;

    try {
      const logged = await this._auth.signin(this.formGroup.value.email, this.formGroup.value.password);
      if (localStorage.getItem('registrationToken')) {
        this._user.update({ id: logged.user.uid, token: localStorage.getItem('registrationToken') })
      }
      if (logged) {
        this.router.navigate(['/tabs'], { replaceUrl: true })
      }
    } catch (e) {
      const alert = await this.alertController.create({
        message: 'Verifique o e-mail e a senha e tente novamente.',
        buttons: ['OK']
      });
      await alert.present();
    }

    this.loading = false;
  }

}
