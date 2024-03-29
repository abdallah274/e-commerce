import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class MyhttpInterceptor implements HttpInterceptor {

  constructor(private _NgxSpinnerService:NgxSpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(localStorage.getItem('etoken') !== null){
   const myToken:any = {
   token:localStorage.getItem('etoken'),
}
   request = request.clone({
      setHeaders:myToken
    })
   }
   
    return next.handle(request);
  }
}
