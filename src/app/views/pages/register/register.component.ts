import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpRequest } from 'src/app/services/http-request.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { alert, saveInLocal } from 'src/app/utils';

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
          alert(this, 'An error occurred!');
          console.error(e);
        },
        complete: () => {
          alert(this, 'User created!');
          saveInLocal(this.myForm.value);
          this.router.navigate(['/empresas/criar']);
        }
      }
    )
  }

  onChangePass() {
    const { passwd, repeatedPass } = this.f;

    this.isRepeatedPassEquals = passwd.value === repeatedPass.value
  }
}
