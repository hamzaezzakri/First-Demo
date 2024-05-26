import { Component, OnInit } from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products: Array<Product> = [];
  keyword: string = "";
  constructor(private productService:ProductService) {
  }

  handleCheckProduct(product: Product) {
      this.productService.checkProduct(product)
        .subscribe({
          next: updatedProduct =>{
            product.checked=!product.checked;
          }
        })
  }

  ngOnInit(): void {
     this.productService.getProducts(1,3)
      .subscribe({
        next: data=> {
          this.products = data
        },
        error : err => {
          console.log(err);
        }
        })

    //this.products$ = this.productService.getProducts();
  }

  handleDelete(product: Product) {
    if(confirm("Etes vous sûre?"))
    this.productService.deleteProduct(product).subscribe({
      next: value => {
        this.products = this.products.filter(p=>p.id!=product.id);
      }
    })
  }

  searchProducts() {
      this.productService.searchProducts(this.keyword).subscribe({
        next:value => {
          this.products = value;
        }
      })
  }
}
