import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { ApiService } from '../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm: FormGroup;
  hidePwdContent=true;
  hideRPwdContent=true;
  constructor(private fb:FormBuilder,private httpService:ApiService,private snakbar:MatSnackBar){
    this.registerForm=fb.group({
      firstName: fb.control('',[Validators.required]),
      lastName: fb.control('',[Validators.required]),
      email: fb.control('',[Validators.required]),
      mobileNumber: fb.control('',[Validators.required]),
      password: fb.control('',[Validators.required]),
      rpassword: fb.control('',[Validators.required])

    })
  }

  register(){
    let user ={
      first: this.registerForm.get("firstName")?.value,
      last: this.registerForm.get("lastName")?.value,
      email: this.registerForm.get("email")?.value,
      mobileNumber: this.registerForm.get("mobileNumber")?.value,
      password: this.registerForm.get("password")?.value,
      rpassword: this.registerForm.get("rpassword")?.value,
    }
    this.httpService.register(user).subscribe({
      next: res=>{
        this.snakbar.open(res,"OK");
      }
    })



  }











}
