import { HttpRequest } from 'src/app/services/http-request.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrl: './new-company.component.scss'
})
export class NewCompanyComponent {
  @Input() isVisibleNewCompany: boolean;
  @Output() onClosed = new EventEmitter<boolean>();

  public myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpRequest,
    private alert: MatSnackBar,
    ) {

    this.isVisibleNewCompany = false;
    this.myForm = this.fb.group({
      nameCompany: [''],
    });
  }

  get f () {
    return this.myForm.controls;
  }

  toggleVisible() {
    this.isVisibleNewCompany = !this.isVisibleNewCompany;
    this.onClosed.emit(false);
  }

  handleChangeVisible(event: any) {
    this.isVisibleNewCompany = event;
  }

  onSubmit() {
    this.httpService.createCompany(this.myForm.value).subscribe(
      {
        next: (v) => console.log(v),
        error: (e) => {
          this.alert.open('An error occurred!')
          console.error(e)
        },
        complete: () => {
          this.alert.open('Dashboard created!');
          this.onClosed.emit(true);
        }
      }
    )
  }
}
