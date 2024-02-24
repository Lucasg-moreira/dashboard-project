import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpRequest } from 'src/app/services/http-request.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { saveInLocal } from 'src/app/utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  myForm: FormGroup;
  public isRepeatedPassEquals: boolean = false;
  public companys: any[] = [];
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder, 
    private httpService: HttpRequest,
    private alert: MatSnackBar
  ) {
    this.myForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      company: ['', [Validators.required]],
      passwd: ['', [Validators.required]],
      repeatedPass: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.httpService.getCompanys().subscribe(result => {
      this.companys = result;
    })
  }

  get f() {
    return this.myForm.controls;
  }

  onRegister() {
    if (!this.myForm.valid) {
      this.myForm.markAllAsTouched();
      return
    }

    this.httpService.createUser(this.myForm.value).subscribe(
      {
        next: (v) => console.log(v),
        error: (e) => {
          this.alert.open('An error occurred!');
          console.error(e);
        },
        complete: () => {
          this.alert.open('User created!');
          saveInLocal(this.myForm.value);
          this.router.navigate(['/dashboard']);
        }
      }
    )
  }

  onChangePass() {
    const { passwd, repeatedPass } = this.f;

    if (passwd.value === repeatedPass.value)
      this.isRepeatedPassEquals = true;
    else
      this.isRepeatedPassEquals = false;
  }
}
