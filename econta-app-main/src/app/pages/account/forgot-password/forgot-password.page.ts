import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { GenericValidator } from 'src/app/components/input-form-ionic/generic-validator';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  type = 'password';
  loading = false;
  submitted = false;
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _auth: AuthenticationService,
    private router: Router,
    private alertController: AlertController,
    private location: Location,
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required, GenericValidator.EMAIL]],
    });
  }



  async login() {
    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }

    this.loading = true;

    await this._auth.recoverPassword(this.formGroup.value.email).then(async res => {
      const alert = await this.alertController.create({
        message: 'Verifique o seu e-mail!',
        buttons: ['OK']
      });
      await alert.present();
    }).catch(async error => {
      const alert = await this.alertController.create({
        message: 'Erro ' + error,
        buttons: ['OK']
      });
      await alert.present();
    });



    this.loading = false;
  }
  back() {
    this.location.back();
  }
}