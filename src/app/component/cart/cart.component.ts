import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/core/pipe/services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  constructor(private _CartService:CartService){}

  cartDetalis:any =null;

ngOnInit(): void {
  this._CartService.getCartUser().subscribe({
    next:(response) =>{
      console.log(response);
      this.cartDetalis = response.data
      
    }
  })
}

callremoveItem(id:string):void{
  this._CartService.removeItem(id).subscribe({
    next:(response)=>{
       this.cartDetalis = response.data;

       this._CartService.cartNumber.next(response.numOfCartItems)
    }
  })
}

changeCount(count:number , id:string):void{
  if(count >=1){
    this._CartService.updateCart(id , count).subscribe({
      next:(response)=>{
        this.cartDetalis = response.data;
      }
      })
      
  }

}

clear():void {
  this._CartService.clearCart().subscribe({
    next:(response)=>{
     console.log(response);
     this.cartDetalis = response.data;
     this._CartService.cartNumber.next(0)
    }
  })
}

}
