import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotpassService  {


  baseUrl:string =`https://ecommerce.routemisr.com/api/v1/auth/`
  constructor(private _HttpClient:HttpClient ) { }


  forgotPassword(userEmial:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl + `forgotPasswords`, userEmial)
  }

  resetCode(resetCode:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl + `verifyResetCode`, resetCode)
  }

  resetPassword(resetPass:object):Observable<any>{
    return this._HttpClient.put(this.baseUrl + `resetPassword`, resetPass)
  }


}
