import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/pipe/services/product.service';
import { CartService } from 'src/app/core/pipe/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
constructor(private _ActivatedRoute:ActivatedRoute,
  private _ToastrService:ToastrService ,
  private _CartService:CartService ,
  private _Renderer2:Renderer2 ,
  private _ProductService:ProductService){
}


productId!:string | null;
productDetails:any=null;
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(params) =>{
      this.productId = params.get('id')
      console.log(this.productId);
      
      
    }
  })

this._ProductService.getProductDetails(this.productId).subscribe({
  next:({data})=> {
    this.productDetails= data;
    console.log(this.productDetails);
    
    
  }
})



}

addProduct(id:any):void {
  this._CartService.addToCart(id).subscribe({
    next:(response)=>{
     
      this._ToastrService.success(response.message);
      this._CartService.cartNumber.next(response.numOfCartItems)
      
    }
  })
} 
}
