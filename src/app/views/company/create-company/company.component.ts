import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpRequest } from 'src/app/services/http-request.service';

import { IconSetService } from '@coreui/icons-angular'
import { cilLink } from '@coreui/icons';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss'
})
export class CompanyComponent {
  myForm: FormGroup;
  public isRepeatedPassEquals: boolean = false;
  
  private urlPattern = '^((http|https)://)?([\\w-]+\\.)+[\\w-]+(/[\\w- ./?%&=]*)?$';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private httpService: HttpRequest,
    private alert: MatSnackBar,
    private iconSet: IconSetService
  ) {
    this.myForm = this.formBuilder.group({
      nameCompany: ['', Validators.required],
      urlCompany: ['', [Validators.required, Validators.pattern(this.urlPattern)]],
    })
    console.log(iconSet.icons)
    iconSet.icons = { ...iconSet.icons, cilLink }
  }

  get f() {
    return this.myForm.controls;
  }

  onSubmit() {
    if (!this.myForm.valid) {
      this.myForm.markAllAsTouched();
      return
    }

    this.httpService.createCompanyDashboard(this.myForm.value).subscribe(
      {
        next: (v) => console.log(v),
        error: (e) => {
          this.alert.open('An error occurred!')
          console.error(e)
        },
        complete: () => {
          this.alert.open('Dashboard created!')
          this.router.navigate(['empresas/listar']);
        }
      }
    )
  }
}
