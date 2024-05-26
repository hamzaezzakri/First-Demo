import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }

  public getProducts(page:number=1, size:number=4): Observable<Array<Product>>{
    return this.http.get<Array<Product>>
    (`https://fakestoreapi.com/products?_page=${page}&_limit=${size}`);
  }

  public checkProduct(product:Product): Observable<Product>{
    return this.http.patch<Product>(`https://fakestoreapi.com/products/${product.id}`,
      {checked:!product.checked});
  }

  public deleteProduct(product:Product){
    return this.http.delete<any>(`https://fakestoreapi.com/products/${product.id}`);
  }

  saveProduct(product: Product):Observable<Product> {
    return this.http.post<Product>("https://fakestoreapi.com/products",product);
  }

  public searchProducts(keyword:string): Observable<Array<Product>>{
    return this.http.get<Array<Product>>(`https://fakestoreapi.com/products?name_like=${keyword}`);
  }
}
