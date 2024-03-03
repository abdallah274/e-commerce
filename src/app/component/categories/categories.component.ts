import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/pipe/services/product.service';
import { Categories } from 'src/app/core/pipe/services/guard/interface/product';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{


category: Categories[] =[];
constructor(private _ProductService:ProductService){}

catrgotrisData:Categories[]=[]
  ngOnInit(): void {
    this._ProductService.getCategories().subscribe({
      next:(response)=>{
     this.category=response.data;
      }
    })
  }
}
