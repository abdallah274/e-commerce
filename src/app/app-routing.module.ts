import { authGuard } from './core/pipe/services/guard/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

 {path:'', canActivate:[authGuard] , loadComponent:()=>import('./layouts/blank-layout/blank-layout.component').then( (m)=>m.BlankLayoutComponent ) , 
children:[
  {path:'' , redirectTo:'home' , pathMatch:"full"},
  {path:'home' , loadComponent:()=>import('./component/home/home.component').then( (m)=>m.HomeComponent), title:'Home'},
  {path:'cart' , loadComponent:()=>import('./component/cart/cart.component').then( (m)=>m.CartComponent), title:'Cart'},
  {path:'products' , loadComponent:()=>import('./component/products/products.component').then( (m)=>m.ProductsComponent), title:'Products'},
  {path:'brands' , loadComponent:()=>import('./component/brands/brands.component').then( (m)=>m.BrandsComponent), title:'Brands'},
  {path:'details/:id' , loadComponent:()=>import('./component/details/details.component').then( (m)=>m.DetailsComponent), title:'Details'},
  {path:'categories' , loadComponent:()=>import('./component/categories/categories.component').then( (m)=>m.CategoriesComponent), title:'Categories'},
  {path:'payment/:id' , loadComponent:()=>import('./component/payment/payment.component').then( (m)=>m.PaymentComponent), title:'Payment'},
  {path:'allorders' , loadComponent:()=>import('./component/allorders/allorders.component').then( (m)=>m.AllordersComponent), title:'Allorders'},
  {path:'forgotPassword' , loadComponent:()=>import('./component/forgot-password/forgot-password.component').then( (m)=>m.ForgotPasswordComponent), title:'ForgotPassword'},
]
},
{path:"" , loadComponent:()=>import('./layouts/auth-layout/auth-layout.component').then( (m)=>m.AuthLayoutComponent ),
children:[
  {path:"" , redirectTo:'login' , pathMatch:"full"},
  {path:'login' , loadComponent:()=>import('./component/login/login.component').then((m)=>m.LoginComponent ), title:'Login'},
  {path:'register' , loadComponent:()=>import('./component/register/register.component').then((m)=>m.RegisterComponent ), title:'Register'},
]
},
{path:'**', loadComponent:()=>import('./component/notfound/notfound.component').then( (m)=>m.NotfoundComponent ), title:"Notfound"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
