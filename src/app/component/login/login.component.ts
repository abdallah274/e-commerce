import { AuthService } from './../../core/auth.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormControlOptions, FormGroup, ReactiveFormsModule , Validators} from '@angular/forms';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){}
  errMsg:string = '';
  isLoding:boolean =false;

  loginForm:FormGroup = new FormGroup({
    email: new FormControl('' , [Validators.required , Validators.email]),
    password: new FormControl('' , [Validators.required , Validators.pattern(/^[a-zA-Z-0-9_@]{6,}$/)]),
    
  })
 

handelForm():void {
 const userData = this.loginForm.value;
 this.isLoding =true;
 if(this.loginForm.valid === true){
this._AuthService.login(userData).subscribe(
  {
    next:(response) =>{
     if(response.message == 'success'){
      localStorage.setItem('etoken' , response.token);
      this._AuthService.codeUser();
      this._Router.navigate(['/home'])
      this.isLoding = false;
     }
    },
    error:(err)=>{
      this.errMsg = err.error.message
      this.isLoding = false;
    }
  }
)    

 }
}

}
