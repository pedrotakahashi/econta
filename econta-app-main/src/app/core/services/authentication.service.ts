import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import firebase from 'firebase/app';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FirebaseErrorsMessages } from '../utils/firebase-errors-messages';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private afa: AngularFireAuth, public http: HttpClient) {}

  signin(email: string, password: string) {
    return this.afa.signInWithEmailAndPassword(email, password).catch(err => Promise.reject(FirebaseErrorsMessages.getMessage(err.code)));
  }

  async logout() {
    return this.afa.signOut();
  }

  signup(email: string, password: string) {
    return this.afa
      .createUserWithEmailAndPassword(email, password)
      .catch(err => Promise.reject(FirebaseErrorsMessages.getMessage(err.code)));
  }

  signupByAPI(_email: string, _password: string, _displayName: string) {
    return this.http
      .post(`${environment.urlApi}/authentications/`, { email: _email, password: _password, displayName: _displayName })
      .toPromise();
  }

  async updateProfile(displayName?: string | null, photoURL?: string | null) {
    const user = await this.getLoggedUser();
    user.updateProfile({ displayName, photoURL });
  }

  async updatePassword(password: string, newPassword: string) {
    try {
      const user = await this.getLoggedUser();

      const credential = firebase.auth.EmailAuthProvider.credential(user.email, password);
      await user.reauthenticateWithCredential(credential);
      await user.updatePassword(newPassword);
    } catch (error) {
      throw new Error(FirebaseErrorsMessages.getMessage(error.code));
    }
  }

  recoverPassword(email: string) {
    return this.afa.sendPasswordResetEmail(email).catch(err => Promise.reject(FirebaseErrorsMessages.getMessage(err.code)));
  }

  /**
   * @deprecated The method should not be used at the instance of AuthenticationService.
   * Use as an instance of AuthSessionService
   */
  
  getLoggedUser() {
    const user = this.afa.authState.pipe(first()).toPromise();
    return user;
  }
}
