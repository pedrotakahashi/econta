import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { hmltInput } from './hmltInput';

declare var flatpickr;

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit, AfterViewInit {
  password = false;

  @Input() label: string;
  @Input() name: string;
  @Input() ex: string;
  @Input() formGroup: FormGroup;
  @Input() submitted: boolean;
  @Input() disabled = false;
  @Input() placeholder: string;
  @Input() defaultBoColor = '#dfdfdf';
  @Input() color = '#00b19d';
  @Input() type = 'string';
  @Input() position = 'floating';

  @Input() mask: string = null;
  @Input() items: any[] = null;

  @Input() multiple = false;

  @Input() selectLabel = 'name';
  @Input() selectId = 'id';

  @Input() rows = 1;

  @Output() change = new EventEmitter();

  hide = false;
  required = false;

  constructor() {}

  get f() {
    return this.formGroup.controls[this.name];
  }

  ngOnInit() {
    this.password = this.type === 'password';

    hmltInput.format();

    setTimeout(() => {
      hmltInput.format();
    }, 1500);

    if (this.type == 'daterange' && flatpickr) {
      setTimeout(() => {
        flatpickr('#' + this.name, {
          mode: 'range',
          locale: 'pt'
        });
      }, 200);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.required = this.f && this.f.errors && this.f.errors.required === true;
    }, 500);

    const item = document.getElementById(this.name) as HTMLInputElement;
    const thit = this;
    if (this.disabled) {
      if (this.type === 'select') {
        this.type = 'text';
        setTimeout(() => {
          const item = document.getElementById(this.name) as HTMLInputElement;
          item.setAttribute('disabled', 'true');
        }, 500);
      } else {
        item.setAttribute('readonly', 'true');
      }
    }
  }

  emit(item, event) {
    if (this[item]) {
      this[item].emit(event);
    }
  }
}
