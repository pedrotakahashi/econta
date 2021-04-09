import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { FirebaseAbstract } from './firebase.abstract';
import { User } from '../models/user';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends FirebaseAbstract<User> {
  static collectionName = 'users';

  constructor(
    protected db: AngularFirestore,
    protected _auth: AuthenticationService,
    private _http: HttpClient
  ) {
    super(db, UserService.collectionName, true);
  }

  setActive(user: User){
    return super.update(user);
  }

  getAllActive() {
    return super.getWhereManyOrderBy([
      { field: 'active', operator: '==', value: true },
    ], 'name', 'asc');
  }
  async getUser() {
    const userLogged = await this._auth.getLoggedUser()
    return super.getById(userLogged.uid);
  }
  getByCpf(cpf) {
    return super.getWhere('cpf', '==', cpf);
  }

  getActives() {
    return super.getWhere('active', '==', true);
  }

  public setActivate(id: string, value: boolean) {
    return super.update({ id, active: value });
  }

  async getParentId(): Promise<string> {
    let user = await this.getUser();

    return user.ownerId;
  }
  public async generateLogin(user: User) {
    const obj = {
      key: '1784ae03-4755-4538-9e51-28cacf8e921a',
      endpoint: 'econta',
      user: {
        email: user.email,
        password: (Math.random() * 1234567).toFixed()
      },
      database: {
        collection: this.collectionName,
        doc: user
      }
    };
    return this._http.post<any>(`${environment.apiOperativeBaseUrl}/general/user`, obj).toPromise()
    .then((data: any) => {
      if (data.status === true && data.code === 10) {
        return data.user;
      }
      throw new Error(
        'Erro ao liberar o cadastro, por favor tente novamente.'
      );
    })
    .catch((error) => {
      throw new Error(
        'Erro ao liberar o cadastro, por favor tente novamente.'
      );
    });
  }
}
