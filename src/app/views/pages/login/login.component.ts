import { HttpRequest } from 'src/app/services/http-request.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
      const isLoginValid = users.find(u => u.username === username.value && u.passwd === passwd.value)

      if (isLoginValid) {
        this.showAlert('Login successful!');
        this.router.navigate(['/dashboard']);
      }
      else {
        this.showAlert('Check login and password!');
      }
    });
  }

  private showAlert(message: string) {
    this.alert.open(message, 'Close', {
      duration: 3000
    })
  }
}
