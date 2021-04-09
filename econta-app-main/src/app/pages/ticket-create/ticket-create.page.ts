import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket, TicketStatus, TicketStatusLabel } from 'src/app/core/models/ticket';
import { TicketMessage } from 'src/app/core/models/ticket-message';
import { User, CustomerRole } from 'src/app/core/models/user';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { TicketMessageService } from 'src/app/core/services/ticket-message.service';
import { TicketService } from 'src/app/core/services/ticket.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { Notifications } from 'src/app/core/models/notification';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.page.html',
  styleUrls: ['./ticket-create.page.scss'],
  encapsulation:ViewEncapsulation.None
})
export class TicketCreatePage implements OnInit {

  data = new Ticket();
  formGroup: FormGroup;
  formMessage: FormGroup;
  users: User[] = [];

  listStatus = [
    { id: TicketStatus.OPEN, name: 'Aberto' },
    { id: TicketStatus.PROCESSING, name: 'Em processo' },
    { id: TicketStatus.FINISH, name: 'Finalizado' }
  ];

  userId = '';
  customerId = '';
  error = '';
  title = 'Chamado';
  editList = false;
  loading = true;
  submitted = false;
  submitting = false;
  bko = false;
  admin = false;
  editing = false;

  l

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _auth: AuthenticationService,
    private formBuilder: FormBuilder,
    private location: Location,
    private _user: UserService,
    private _router: Router,
    private _customer: CustomerService,
    private _notification: NotificationService,
    private _ticket: TicketService,
    private _ticketMessage: TicketMessageService,
  ) { }

  async ngOnInit() {
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      state: [TicketStatus.OPEN, Validators.required],
    });

    this.formMessage = this.formBuilder.group({
      message: ['', Validators.required],
    });

    this.fetchData();
    await this.getLogged();
  }

  async fetchData() {
    this.loading = true;
    const snap = this._activatedRoute.snapshot;
    // const str: string = snap['_routerState'].url;
    // this.rlinking = str.substr(0, str.lastIndexOf('/'));

    const itemId = snap.paramMap.get('itemId');
    if (itemId) {
      this.customerId = itemId;
    }

    const id = snap.paramMap.get('ticketId') || snap.paramMap.get('id');
    if (id) {
      try {
        this.data = await this._ticket.getById(id);
        this.customerId = this.data.customerId;
        this.formGroup.patchValue(this.data);

        this.data.messages = [];
        this._ticketMessage.getAllByTicket(id).subscribe(async (res) => {
          for (let index = 0; index < res.length; index++) {
            const element = res[index];
            switch (element.type) {
              case "added":
                this.data.messages.push(element.data)

                if (this.users.find(x => x.id == element.data.userId) == null) {
                  const res = await this._user.getById(element.data.userId);
                  this.users.push(res);
                }

                break;
              case "removed":
                const indexs = this.data.messages.findIndex(x => x.id == element.data.id);
                if (indexs != -1) {
                  this.data.messages.slice(indexs, 1)
                }
                break;
              case "modified":
                const index = this.data.messages.findIndex(x => x.id == element.data.id);
                if (index != -1) {
                  this.data.messages[index] = element.data
                }
                break;
              default:
                break;
            }

          }
          this.data.messages.sort((x, y) => { return x.createdAt < y.createdAt ? -1 : 1 })
        })

      } catch (e) {
        console.log(e);

        return;
      }
    }

    this.loading = false;
  }

  async getLogged() {
    try {
      const user = await this._auth.getLoggedUser();
      this.userId = user.uid;
      const res = await this._user.getById(this.userId);
      this.users.push(res);

      if (res.role === CustomerRole.ADMIN) {
        this.admin = true;
      } else {
        if (!this.customerId) {
          this.customerId = res.ownerId;
        }
        this.admin = false;
      }
    } catch {
      this.admin = false;
    }
  }

  async onSubmit() {
    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }

    this.loading = true;

    try {
      this.submitting = true;
      this.error = '';

      const data = {...this.data};
      Object.assign(data, this.formGroup.value);


      data.userId = this.userId;
      data.state = this.formGroup.value.state;

      const res = await this._ticket.save(data);
      if (!data.id) {
        data.id = res['id'];
        data.customerId = this.customerId;
        const message = new TicketMessage();
        message.ticketId = data.id;
        message.userId = this.userId;
        message.message = this.formMessage.value.message;
        data.lastMessage = message;
        await this._ticket.save(data);
        await this._ticketMessage.add(message);
      }

      const user = (await this._user.getById(this.userId)).name;
      const notify = new Notifications();
      notify.userId = this.userId;
      notify.customerId = this.customerId;
      notify.redirectTo = `/tickets/managing/${data.id}`;
      notify.forBKO = !(this.admin || this.bko);
      if (this.admin) {
        notify.message = `Chamado aberto pelo colaborador ${user}`;
      } else {
        const customer = await this._customer.getById(this.customerId);
        notify.message = `Chamado aberto por ${user} da empresa ${customer.fantasia ? customer.fantasia : customer.razao}`;
      }
      await this._notification.add(notify);

      this.location.back();
      // this._router.navigate([this.rlinking]);

    } catch (e) {
      Swal.fire('Erro!', 'Não foi possível gerar um novo chamado.', 'error');
    }

    this.loading = false;
  }

  addTicket() {
    Swal.fire({
      title: 'Escreva seu comentário!',
      input: 'textarea',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Adicionar',
      showLoaderOnConfirm: true,
      preConfirm: (res) => {

        if (res) {
          const message = new TicketMessage();
          message.ticketId = this.data.id;
          message.userId = this.userId;
          message.message = res;
          return this._ticketMessage.save(message).catch(error => {
            Swal.showValidationMessage(
              `Error: ${error}`
            );
          }).then( async () => {
            this.data.lastMessage = message;
            let data = {
              lastMessage: message,
              id: this.data.id,

            };
            if(this.admin){
              this.formGroup.controls.state.setValue(TicketStatus.PROCESSING)
              data['state']=TicketStatus.PROCESSING;
            }
            this._ticket.update(data);

            try {
              const user = await this._user.getById(this.userId);
              const notify = new Notifications();
              notify.userId = this.userId;
              notify.customerId = this.customerId;
              notify.forBKO = !(this.admin || this.bko);
              if (this.admin) {
                notify.message = `Chamado respondido pelo colaborador ${user.name}`;
              } else {
                const customer = await this._customer.getById(this.customerId);
                notify.message = `Chamado respondido por ${user.name} da empresa ${customer.fantasia ? customer.fantasia : customer.razao}`;
              }
              notify.redirectTo = `/tickets/managing/${data.id}`;
              const res = await this._notification.save(notify);
            } catch (e) {
              Swal.fire('Erro!', 'Não foi possível gerar uma notificação para o chamado.', 'error');
            }

          });
        }
        return;
      },
    }).then(async (result) => {
      //
    });
  }

  getTicketStatus(status) {
    return TicketStatusLabel.get(status);
  }

  getUserName(uid) {
    const user = this.users.find(x => x.id === uid);
    return user ? user.name : '';
  }

}

