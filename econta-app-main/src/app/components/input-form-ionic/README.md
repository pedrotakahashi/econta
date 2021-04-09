v 1.1.1
importa��o no modulo da p�gina

vers�o do plugin da mascara 8.1.3

 entryComponents: [InputFormComponent],
 imports: [
  ]


  ],

Uso de validadores
 this.formGroup = this.formBuilder.group({
  cpf: [null, GenericValidator.CPF],
  cnpj: ['',GenericValidator.CNPJ],
})

Uso



  <div class="form-group mb-3">
            <input-form type="select" (change)="change()" [items]="allCliente" label='Selecione o cliente'
              name='cliente_id' selectLabel="nome_fantasia" selectId="id" notFoundText='Item n�o encontrado'
              [submitted]='submitted' [formGroup]="formGroup">
            </input-form>
          </div>


  <div class="col-6 form-group mb-3">
              <input-form type="select" [items]="l_tipoPessoa" label='Tipo de pessoa' name='tipo_pessoa_id'
                [submitted]='submitted' [formGroup]="userForm"></input-form>
            </div>


Aten��o no uso do data
  <div class="col-6 form-group mb-3">
              <input-form type="date" label='Data da funda�ao' name='data_fundacao' [submitted]='submitted'
                [formGroup]="userForm"></input-form>
            </div>
exemplo
.ts{
	//na hora de pegar
	 if (userId) {
      try {
        this.data = await this._boxer.getById(id);

        this.formGroup.patchValue(this.data);
        if (this.data.registrationExpirationDate) {
          this.f.registrationExpirationDate.setValue(formatDateNgb(this.data.registrationExpirationDate));
        }
      } catch (e) {
        this.location.back();
        Swal.fire('Erro!', 'A categoria n�o existe!', 'error');
        return;
      }
    }
	//na hora de salvar


	 Object.assign(this.data, this.formGroup.value);
    if (this.data.registrationExpirationDate) {
      this.data.registrationExpirationDate = formatStringNbg(this.data.registrationExpirationDate);
    }


}


      data Range colocar no 'index.html'
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
  <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
  <script src="https://npmcdn.com/flatpickr/dist/l10n/pt.js"></script>





//Exemplo Completo
html

<form class="needs-validation" [formGroup]="formGroup" (ngSubmit)="onSubmit()" novalidate *ngIf="!loading">
    <div class="row">
      <div class="col-lg-6">
        <div class="card-box">
          <h5 class="text-uppercase bg-light p-2 mt-0 mb-3">Dados Pessoais</h5>
          <div class="row">

            <div class="col-6 form-group mb-3">
              <input-form label='Nome' name='name' [submitted]='submitted' [formGroup]="formGroup">
              </input-form>
            </div>
            <div *ngIf="teacher.id" class=" col-6 form-group mb-3">
              <input-form type="switch" label='Ativo' name='active' [submitted]='submitted' [formGroup]="formGroup">
              </input-form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="text-right mb-3">
          <a href="javascript:history.back()" class="btn w-sm btn-light waves-effect">Voltar</a>
          <button type="submit" class="btn btn-blue block waves-effect waves-ligh" [disabled]="submitting">
            <span class="spinner-grow spinner-grow-sm mr-1" *ngIf="submitting"></span>
            Salvar
          </button>
        </div>
      </div>
    </div>
  </form>



 /////////////////////////// .ts


 formGroup: FormGroup;
  submitted = false;
  submitting = false;
  error = '';
  loading = true;
  teacher = new Teacher();



  constructor(
    private formBuilder: FormBuilder,
    private _teacher: TeacherService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
  ) { }

  async ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: [''],
      active: [true],
    });
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      try {
        this.teacher = await this._teacher.getById(id);
        this.formGroup.patchValue(this.teacher);

      } catch (e) {
        this.location.back();
        Swal.fire('Erro!', 'O professor não existe!', 'error');
        return;
      }
    }
    this.loading = false;
  }

  get f() {
    return this.formGroup.controls;
  }


  async onSubmit() {
    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }
    this.submitting = true;
    this.error = '';
    Object.assign(this.teacher, this.formGroup.value);
    try {
      if (this.teacher.id) {
        await this._teacher.update(this.teacher);
      } else {
        this.teacher.active = true;
        await this._teacher.add(this.teacher);
      }
      await Swal.fire('Sucesso!', 'O professor foi salvo', 'success');
      this.location.back();
    } catch (error) {
      this.error = error;
      this.submitting = false;
    }
  }

