import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signUpInprogres = false;
  signInInprogres = false;
  signUpOpened: boolean = true;
  loginForm:any = {};
  signupForm:any = {};
  email:String;

  constructor(private route: Router, private _snackBar: MatSnackBar, private loginService : LoginService) { 
    console.log(localStorage.getItem('user'));
    
  }

  ngOnInit(): void {

  }

  openSignInContent() {
    this.signUpOpened = false;
  }

  openSignUpContent() {
    this.signUpOpened = true;
  }

  signIn() {  
    this.signInInprogres = true;

    console.log(this.loginForm.email);
    this.loginService.loginUser(this.loginForm)
    .subscribe((d : any) => {
      // this._snackBar.open(this.loginForm.email+" Sign In is Successfull ", '', {duration: 2000});
      localStorage.setItem('user', JSON.stringify(d.data));

      // console.log(JSON.parse(localStorage.getItem('user')).name);
      this.signInInprogres = false;
       this.route.navigate(['/dashboard']);
    }, (err) => {
      console.log(err);
      if(err.error.message) this._snackBar.open(`${err.error.message}`, '', {duration: 2000});
      else this._snackBar.open(`${err.message}`, '', {duration: 2000});

      this.signInInprogres = false;
    })
  }

  signUp() {
    this.signUpInprogres = true;
    console.log(this.signupForm.email);

    this.loginService.signUpUser(this.signupForm)
    .subscribe((d : any) => {
      this.signUpInprogres = false;
      this._snackBar.open(this.signupForm.userName+" Sign Up is Successfull ", '', {duration: 2000});      
      this.signUpOpened = false;
    }, (err) => {
      console.log(err.error);
      this.signUpInprogres = false;
      this._snackBar.open(`${err.error.message}`, '', {duration: 3000});  
    })
  }

}
