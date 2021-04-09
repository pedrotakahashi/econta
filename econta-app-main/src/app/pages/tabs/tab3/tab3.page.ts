import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  user: User;

  constructor(private _user: UserService, private _auth: AuthenticationService, private router: Router) {}

  async ngOnInit() {
    this.user = await this._user.getUser();
  }

  async logout() {
    await this._auth.logout();
    this.router.navigate(['/login']);
  }
}
