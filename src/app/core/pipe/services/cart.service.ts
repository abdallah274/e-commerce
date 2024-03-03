import { Product } from 'src/app/core/pipe/services/guard/interface/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl:string =`https://ecommerce.routemisr.com/api/v1/`;
 


  cartNumber:BehaviorSubject<number> = new BehaviorSubject(0);


  constructor(private _HttpClient:HttpClient) { }
  addToCart(ProductId:string):Observable<any> {
    return this._HttpClient.post(this.baseUrl + `cart` , {
      productId: ProductId
    }
    
    )
  }
  getCartUser():Observable<any> {
    return this._HttpClient.get(this.baseUrl + 'cart' )
  }

  removeItem(prodId:string|null):Observable<any> {
    return this._HttpClient.delete(this.baseUrl + `cart/${prodId}` )
  }

  updateCart(prodId:string , countNum:number):Observable<any> {
    return this._HttpClient.put(this.baseUrl + `cart/${prodId}`, {

      count : countNum
    }
    )
  }


  clearCart():Observable<any> {
    return this._HttpClient.delete(this.baseUrl + `cart` 
    )
  }

checkOut(cartId:string|null , orderInfo:object):Observable<any>{
  return this._HttpClient.post(this.baseUrl +
     `orders/checkout-session/${cartId}?url=http://localhost:3000`,
      {
     shippingAddress:orderInfo
     }
     )
}

}
