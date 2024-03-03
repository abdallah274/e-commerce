import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userInfo:any;

  baseUrl:string = `https://ecommerce.routemisr.com/api/v1/auth/`;
  constructor(private _HttpClient:HttpClient) { }
  register(userData:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl + 'signup' , userData)
  }
  login(userData:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl + 'signin' , userData)
  }

codeUser():void{
  const code = localStorage.getItem('etoken');
  if(code !== null){
    const decode = jwtDecode(code);
    this.userInfo = decode;
    console.log(decode);
    
  }
}
  
}
