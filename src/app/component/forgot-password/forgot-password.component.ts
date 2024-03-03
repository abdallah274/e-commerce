import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ForgotpassService } from 'src/app/core/pipe/services/forgotpass.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule , RouterLink , ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

constructor( private _ForgotpassService:ForgotpassService , private _Router:Router){}
  step1:boolean = true;
  step2:boolean = false;
  step3:boolean = false;
email:string=''
userMsg:string ='';

 forgotForm:FormGroup = new FormGroup({
  email:new FormControl('')
 })
 resetCode:FormGroup = new FormGroup({
  resetCode:new FormControl('')
 })
  
 resetPassword:FormGroup = new FormGroup({
  newPassword:new FormControl('')
 })
  



 forgotPassword():void{
  let userEmial = this.forgotForm.value;
  this.email = userEmial.email;
  this._ForgotpassService.forgotPassword(userEmial).subscribe(
  {
    next:(response)=>{
      console.log(response);
      this.userMsg = response.message
      this.step1 =false;
      this.step2 = true;
    },error:(err)=>{
this.userMsg= err.error.message
    }
  }
  )
 }

 resetCod():void{
  let resetcode = this.resetCode.value
this._ForgotpassService.resetCode(resetcode).subscribe({
  next:(response)=>{
    this.userMsg = response.status
    this.step2 = false;
    this.step3 = true;
  } ,error:(err)=>{
this.userMsg= err.error.message
    }
})
 }
 resetPass():void{
let resetpas = this.resetPassword.value;


  this._ForgotpassService.resetPassword(resetpas).subscribe({
    next:(response)=>{
     if(response.token){
       localStorage.setItem('_token' , response.token)
       this._Router.navigate(['/home'])
     }
    } ,error:(err)=>{
  this.userMsg= err.error.message
      }
  })

 }




}
