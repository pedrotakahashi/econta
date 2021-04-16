import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { Invoice } from "src/app/core/models/invoice";
import { InvoiceMap } from "src/app/core/models/invoice-map";
import { InvoiceMapService } from "src/app/core/services/invoice-map.service";
import { InvoiceService } from "src/app/core/services/invoice.service";
import { UserService } from "src/app/core/services/user.service";
import { environment } from "src/environments/environment";
import { PopoverController } from "@ionic/angular";
import {FilterComponent,} from "src/app/components/filter/filter.component";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})

export class Tab1Page implements OnInit {

  list: Invoice[] = [];
  listFull: Invoice[] = [];
  listMonth: { name: string; monthNumber: number }[] = [];

  listMapCompany: InvoiceMap[] = [];
  listMap: InvoiceMap[] = [];
  currentMonth: { name: string; monthNumber: number } = null;
  currentMapCompany: InvoiceMap = null;
  totalRecords = 0;
  urlbase = environment.apiOperativeBaseUrl;

  loading = true;
  constructor(
    private _invoice: InvoiceService,
    private _invoiceMap: InvoiceMapService,
    private _user: UserService,
    public popoverController: PopoverController
  ) {}

  async ngOnInit() {
    this.loading = true;
    //next func open the modalBox with searchBar
  }
//EOF
  ionViewWillEnter() {
    this.loadList();
  }
//EOF
  async loadList() {
    const customer = await this._user.getUser();
    try {
      this.list = this.listFull = await this._invoice.getAllByCustomerId(
        customer.ownerId
      );
      this.listMap = await this._invoiceMap.getWhere(
        "ownerId",
        "==",
        customer.ownerId
      );
      const months: { name: string; monthNumber: number }[] = [];
      this.list.forEach((item) => {
        const i = this.listMap.findIndex(
          (x) => x.accountNumber === item.accountNumber
        );
        if (i >= 0) {
          this.addListMonth(months, item.dueDate);
          item.companyName = this.listMap[i].name;
        }
      });
      this.listMonth = months;
      this.listMapCompany = this.listMap.filter(function (elem, index, self) {
        return index === self.findIndex((x) => x.document === elem.document);
      });

      this.totalRecords = this.list.length;
    } catch (e) {
      console.log(e);
    }
    this.loading = false;
  }
//EOF
  addListMonth(list: { name: string; monthNumber: number }[], date: Date) {
    const monthNames = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    const i = list.findIndex((x) => x.monthNumber === date.getMonth());
    if (i < 0) {
      list.push({
        name: monthNames[date.getMonth()],
        monthNumber: date.getMonth(),
      });
      list.sort((a, b) => (a.monthNumber < b.monthNumber ? -1 : 1));
    }
  }
//EOF
  onChangeInvoiceMapCompany() {
    if (this.currentMapCompany) {
      if (this.currentMonth) {
        this.list = this.listFull.filter(
          (x) =>
            x.companyName === this.currentMapCompany.name &&
            x.dueDate.getMonth() === this.currentMonth.monthNumber
        );
      } else {
        this.list = this.listFull.filter(
          (x) => x.companyName === this.currentMapCompany.name
        );
      }
    } else {
      if (!this.currentMonth) {
        this.list = this.listFull;
      } else {
        this.list = this.listFull.filter(
          (x) => x.dueDate.getMonth() === this.currentMonth.monthNumber
        );
      }
      this.currentMapCompany = null;
    }
  }
//EOF
  async presentPopover() {
    // console.log("presentPopover() is okay!");
    const popover = await this.popoverController.create({
      component: FilterComponent,
      cssClass: "filter.component.scss",
      translucent: true,
      componentProps: {
      },
    });

    await popover.present();
    const { data } = await popover.onDidDismiss();
    // console.log("resultado:", data);
    if(data && data.list){
      this.list = data.list;
    }
    
  }
//EOF
}
