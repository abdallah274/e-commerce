import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/pipe/services/product.service';
import { Categories, Product } from 'src/app/core/pipe/services/guard/interface/product';
import { CutPipe } from 'src/app/core/pipe/cut.pipe';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/core/pipe/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Categ} from 'src/app/core/interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { SearchPipe } from 'src/app/core/pipe/search.pipe';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule , CutPipe , RouterLink, CarouselModule , SearchPipe , FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit {
  constructor(private _ProductService:ProductService , private _CartService:CartService , private _ToastrService:ToastrService){}
  productsData: Product[] = [];
  Categories: Categ[] =[];
  categoriesData:Categories[] = [];
  term:string =''; 

  ngOnInit(): void {
    this._ProductService.getProductData().subscribe({
      next: (response)=>{
     this.productsData= response.data;
      }
    });

    this._ProductService.getCategoriesData().subscribe({
      next:(response)=>{
    this.Categories= response.data;
     console.log(this.Categories);
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


  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  mainslideOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: true
  }

}
