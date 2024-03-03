import { AuthService } from './../../core/auth.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormControlOptions, FormGroup, ReactiveFormsModule , Validators} from '@angular/forms';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private _AuthService:AuthService , private _Router:Router){}
  errMsg:string = '';
  isLoding:boolean =false;

  registerForm:FormGroup = new FormGroup({
    name: new FormControl('' , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),
    email: new FormControl('' , [Validators.required , Validators.email]),
    password: new FormControl('' , [Validators.required , Validators.pattern(/^[a-zA-Z-0-9_@]{6,}$/)]),
    rePassword: new FormControl(''),
    phone: new FormControl('' , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)])
  }, {validators:[this.confirmPassword]} as FormControlOptions)
 
confirmPassword(group:FormGroup):void {
  const password = group.get('password')
  const rePassword = group.get('rePassword')

if(rePassword?.value == ''){
  rePassword?.setErrors({required:true})
}else if(password?.value != rePassword?.value) {
  rePassword?.setErrors({mismatch:true})
}
}

handelForm():void {
 const userData = this.registerForm.value;
 this.isLoding =true;
 if(this.registerForm.valid === true){
this._AuthService.register(userData).subscribe(
  {
    next:(response) =>{
     if(response.message == 'success'){
      console.log(response);
      
      this._Router.navigate(['/login'])
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
