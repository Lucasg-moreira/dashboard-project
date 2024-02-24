import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpRequest } from 'src/app/services/http-request.service';
import { alert } from 'src/app/utils';



@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss'
})
export class CompanyComponent implements OnInit {
  public myForm: FormGroup;

  public isRepeatedPassEquals: boolean = false;

  @Input()
  public showNewCompany = false;

  public companys: any[] = [];

  private urlPattern = '^((http|https)://)?([\\w-]+\\.)+[\\w-]+(/[\\w- ./?%&=]*)?$';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private httpService: HttpRequest,
    private alert: MatSnackBar,
  ) {
    this.myForm = this.formBuilder.group({
      id: ['', Validators.required],
      urlCompany: ['', [Validators.required, Validators.pattern(this.urlPattern)]],
    })
  }

  ngOnInit(): void {
    this.getCompanys();
  }

  get f() {
    return this.myForm.controls;
  }

  private getCompanys() {
    this.httpService.getCompanys().subscribe(result => {
      this.companys = result;
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
    if (selectedValue == '-1')
      this.showNewCompany = !this.showNewCompany;
  }

  public onClosed(event: any) {
    this.showNewCompany = !this.showNewCompany;

    if (event) {
      this.getCompanys();
      return
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // React to changes in the 'data' input property
    if (changes['showNewCompany']) {
      const currentValue = changes['showNewCompany'].currentValue;
      const previousValue = changes['showNewCompany'].previousValue;

      console.log('Data changed from', previousValue, 'to', currentValue);
    }
  }
}
