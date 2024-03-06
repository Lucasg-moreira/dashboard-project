import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpRequest } from 'src/app/services/http-request.service';
import { alert, getUserLogged, isUserAdmin } from 'src/app/utils';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss'
})
export class CompanyComponent implements OnInit {
  public myForm: FormGroup;

  public user: any = getUserLogged();
  public isAdmin: boolean = isUserAdmin();
  public isRepeatedPassEquals: boolean = false;

  public userCompany: string = '';

  @Input()
  public showNewCompany = false;
  public companys: any[] = [];
  public table: any[] = [];
  private urlPattern = '^((http|https)://)?([\\w-]+\\.)+[\\w-]+(/[\\w- ./?%&=]*)?$';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private httpService: HttpRequest,
  ) {
    this.myForm = this.formBuilder.group({
      id: ['', Validators.required],
      urlCompany: ['', [Validators.required, Validators.pattern(this.urlPattern)]],
      nameDashboard: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.getCompanys();
    this.getDataTable();
  }

  get f() {
    return this.myForm.controls;
  }

  private getDataTable(id?: string) {
    this.httpService.getCompanyUrl().subscribe(
      {
        next: (result) => {
          this.table = result;

          if (id)
            this.table = this.table.filter(el => el.idCompany == id);

          if (!this.isAdmin)
            this.table = this.table.filter(el => el.idCompany == this.user.company);
        },
        error: error => {
          console.error('Error:', error);
        }
      }
    )
  }

  private getCompanys() {
    this.httpService.getCompanys().subscribe(result => {
      this.companys = result;

      if (!this.user)
        throw new Error('Usuário não encontrado!');

      let company = result.find((el: any) => el.id === this.user.company);
      this.userCompany = company?.nameCompany;
    });
  }

  onSubmit() {
    if (!this.myForm.valid) {
      this.myForm.markAllAsTouched();
      return
    }

    this.httpService.createCompanyUrl(this.myForm.value).subscribe(
      {
        next: (v) => console.log(v),
        error: (e) => {
          alert(this, 'An error occurred!');
          console.error(e)
        },
        complete: () => {
          alert(this, 'Dashboard created!');
          this.router.navigate(['empresas/listar']);
        }
      }
    )
  }

  onSelectChange(event: any) {
    const selectedValue = event.target.value;

    if (selectedValue == '-1') {
      this.showNewCompany = !this.showNewCompany;
      return;
    }

    this.getDataTable(this.f['id'].value);
  }

  public onClosed(event: any) {
    this.showNewCompany = !this.showNewCompany;

    if (event) {
      this.getCompanys();
      return
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showNewCompany']) {
      const currentValue = changes['showNewCompany'].currentValue;
      const previousValue = changes['showNewCompany'].previousValue;

      console.log('Data changed from', previousValue, 'to', currentValue);
    }
  }
}
