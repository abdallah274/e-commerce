import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/pipe/services/product.service';
import { Product } from 'src/app/core/pipe/services/guard/interface/product';
import { RouterLink } from '@angular/router';
import { CutPipe } from 'src/app/core/pipe/cut.pipe';
import { CartService } from 'src/app/core/pipe/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule , RouterLink , CutPipe , NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
constructor(private _ProductService:ProductService
   , private _CartService:CartService ,
    private _ToastrService:ToastrService){}
productsData: Product[] = [];
pageSize:number = 0;
currentPage:number =0;
total:number =0

ngOnInit(): void {
  this._ProductService.getProductData().subscribe({
    next: (response)=>{
   this.productsData= response.data;
   this.pageSize = response.metadata.limit
   this.currentPage = response.metadata.currentPage
   this.total = response.results
   
    }
  });
}

addProduct(id:any):void {
  this._CartService.addToCart(id).subscribe({
    next:(response)=>{
      this._ToastrService.success(response.message);
      this._CartService.cartNumber.next(response.numOfCartItems)
    }
  })
} 


pageChanged(event:any):void {
  this._ProductService.getProductData(event).subscribe({
    next: (response)=>{
   this.productsData= response.data;
   this.pageSize = response.metadata.limit
   this.currentPage = response.metadata.currentPage
   this.total = response.results
   
    }
  });

}











}
