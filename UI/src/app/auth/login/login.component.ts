import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;
  hidePwdContent = true;
  constructor(private fb: FormBuilder, private httpService: ApiService, private snakbar: MatSnackBar) {
    this.loginForm = fb.group({
      email: fb.control('', [Validators.required, Validators.email]),
      password: fb.control('', [Validators.required])
    });
  }


  login() {
    let loginModel = {
      email: this.loginForm.get("email")?.value,
      password: this.loginForm.get("password")?.value,
    }
    debugger
    this.httpService.login(loginModel).subscribe({
      next: res => {
        debugger
        if (res == "not found") {
          this.snakbar.open("credential not valid", "OK");
        } else if (res == 'unapproved') {
          this.snakbar.open("Please get Approval From Admin", "OK");
        } else {
          localStorage.setItem('access_token', res);
          this.httpService.userStatus.next("loggedIn");
        }
      }
    })



  }




}
