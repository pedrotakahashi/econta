import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from 'src/app/core/models/ticket';
import { User, CustomerRole } from 'src/app/core/models/user';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { TicketService } from 'src/app/core/services/ticket.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  list: Ticket[] = [];
  users: User[] = [];
  userId = '';
  loading = true;
  admin = false;


  constructor(
    private _ticket: TicketService,
    private _user: UserService,
  ) { }

  async ngOnInit() {
    this.loading = true;
  }
  ionViewWillEnter() {
    this.getTickets();
  }

  async getTickets() {
    try {
      const user = await this._user.getUser();
      this.userId = user.id;
      if (user.role == CustomerRole.ADMIN) {
        this.list = await this._ticket.getAll("createdAt");
        this.admin = true;
      } else {
        const res = await this._user.getById(this.userId);
        this.list = await this._ticket.getAllByCustomer(res.ownerId);
        this.admin = false;
      }
      this.list.forEach(async item => {
        if (!this.users.find(x => x.id == item.userId)) {
          const res = await this._user.getById(item.userId);
          this.users.push(res);
        }
        if (!this.users.find(x => x.id == item.lastMessage.userId)) {
          const res = await this._user.getById(item.lastMessage.userId);
          this.users.push(res);
        }
      });
      this.loading = false;
    } catch (e) {
      console.log(e);
      this.admin = false;
    }
  }
  getUserName(uid) {
    const user = this.users.find(x => x.id === uid);
    return user ? user.name : '';
  }

}
