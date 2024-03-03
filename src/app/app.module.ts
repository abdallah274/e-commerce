import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CuttextPipe } from './core/pipe/cuttext.pipe';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyhttpInterceptor } from './core/interceptors/myhttp.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    AppComponent,
    CuttextPipe,
  ],
  imports: [
    BrowserModule, AppRoutingModule ,HttpClientModule , ToastrModule.forRoot(),BrowserAnimationsModule , NgxSpinnerModule],
  providers: [
    { provide:HTTP_INTERCEPTORS , useClass:MyhttpInterceptor , multi:true},
],
  bootstrap: [AppComponent]
})
export class AppModule { }
