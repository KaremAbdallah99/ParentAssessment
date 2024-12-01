import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  customEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  isInputValid = false;
  isPassValid = false;
  isError:boolean = false;
  isShows:boolean = false;
  errorMessage:string = '';
  loginForm :FormGroup = new FormGroup({
    email: new FormControl (null, [Validators.required ,Validators.email,Validators.pattern(this.customEmailPattern) ]),
    password: new FormControl (null, [Validators.required])
   });

   constructor(private auth:AuthService, private router: Router){}

   emailValid(){
    this.isError = false;
    if(this.loginForm.get('email')?.errors){
      this.isInputValid = true

    }else{
      this.isInputValid = false

    }
  }
  passwordValid(){
    this.isError = false;
    if(this.loginForm.get('password')?.errors){
      this.isPassValid= true

    }else{
      this.isPassValid= false

    }
  }
  toggleShowPassword(){
    this.isShows =! this.isShows
  }
   sendLogin(data:FormGroup){
    if(this.loginForm.get('email')?.errors && this.loginForm.get('password')?.errors){
      this.isInputValid = true
      this.isPassValid = true

    } else if (this.loginForm.get('password')?.errors &&!this.loginForm.get('email')?.errors){
      this.isPassValid = true
      this.isInputValid = false
    } else if (!this.loginForm.get('password')?.errors &&this.loginForm.get('email')?.errors){
      this.isPassValid = false
      this.isInputValid = true
    } else {

      this.isInputValid = false
      this.isPassValid = false
      this.auth.sendLogin(data.value).subscribe((res)=>{
        localStorage.setItem('token', res.token);
        this.router.navigate(['/user-list']);
      },(error)=>{
        this.isError = true
        this.errorMessage = error.error.error;
      })
    }
  }
}
