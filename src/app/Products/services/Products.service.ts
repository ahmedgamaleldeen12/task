import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product, PagedProducts } from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly http = inject(HttpClient);

  constructor() {}

  getProducts(): Observable<Product[]> {
    return this.http.get<{ products: Product[] }>('assets/Products.json').pipe(
      map(response => response.products) 
    );
  }

  getPagedProducts(skipCount: number, pageSize: number = 5): Observable<PagedProducts> {
    return this.getProducts().pipe(
      map((products: Product[]) => {
        const pagedItems = products.slice(skipCount, skipCount + pageSize);
        return { items: pagedItems, totalCount: products.length };
      })
    );
  }
}
