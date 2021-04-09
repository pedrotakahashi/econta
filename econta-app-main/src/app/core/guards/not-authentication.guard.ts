import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuthenticationGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthenticationService) {}

  async canActivate(): Promise<boolean | UrlTree> {
    const loggedUser = await this.auth.getLoggedUser();
    if (loggedUser) {
      return this.router.parseUrl('/tabs');
    }

    return true;
  }
}
