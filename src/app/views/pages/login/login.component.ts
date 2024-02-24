import { HttpRequest } from 'src/app/services/http-request.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { saveInLocal } from 'src/app/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public myForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private httpService: HttpRequest,
    private alert: MatSnackBar
  ) {
    this.myForm = this.formBuilder.group({
      username: ['', Validators.required],
      passwd: ['', [Validators.required]],
    })
  }

  get f() {
    return this.myForm.controls;
  }

  onLogin() {
    const { username, passwd } = this.f;

    this.httpService.getUsers().subscribe(users => {
      const loggedUser = users.find(u => u.username === username.value && u.passwd === passwd.value)

      if (loggedUser) {
        this.showAlert('Login successful!');
        saveInLocal(loggedUser);
        this.router.navigate(['/dashboard']);
      }
      else {
        this.showAlert('Check login and password!');
        this.myForm.markAllAsTouched();
      }
    });
  }

  private showAlert(message: string) {
    this.alert.open(message, 'Close', {
      duration: 3000
    })
  }
}
