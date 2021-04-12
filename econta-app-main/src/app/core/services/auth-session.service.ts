import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { Storage } from '../helpers/storage';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthSessionService {
  private subscriptions: Subscription[] = [];
  private loggedIn: BehaviorSubject<User>;

  constructor(
    private afa: AngularFireAuth,
    private _user: UserService,
  ) {
    const user = Storage.getItem<User>('@application/user');
    this.loggedIn = new BehaviorSubject<User>(user || undefined);

    this.afa.authState.subscribe(async state => {
      if (state) {
        this.listeners(state.uid);
      } else {
        this.unlisteners();
      }
    });
  }

  get loggedUser(): Observable<User> {
    return this.loggedIn.asObservable().pipe(filter(loggedIn => loggedIn !== undefined));
  }

  getLoggedUser(): User {
    return this.loggedIn.value;
  }

  private setLoggedUser(user: User): void {
    this.loggedIn.next(user);
    Storage.setItem('@application/user', user);
  }

  getLoggedUserId(): string {
    return this.loggedIn.value.id;
  }

  async getBearerToken(): Promise<string> {
    const userLogged = await this.getAuthState();
    return userLogged.getIdToken();
  }

  getAuthState(): Promise<firebase.User> {
    return this.afa.authState.pipe(first()).toPromise();
  }

  async logout(): Promise<void> {
    const userId = this.getLoggedUserId();

    Storage.removeItem('@application/user');
    this.loggedIn.next(undefined);

    await this.afa.signOut();
  }

  private async listeners(userId: string): Promise<void> {
    this.subscriptions.push(
      this._user.getAsyncById(userId).subscribe(data => {
        this.setLoggedUser(data);
      })
    );
  }

  private unlisteners(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
