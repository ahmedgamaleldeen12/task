import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product, PagedProducts } from '../models/model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly http = inject(HttpClient);

  // up on i can't do changes in static Json File I will simulate make edit and delete operations in memory
  private readonly products$ = new BehaviorSubject<Product[]>([]);

  constructor() {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.http
      .get<{ products: Product[] }>('assets/Products.json')
      .pipe(map((response) => response.products))
      .subscribe((products) => this.products$.next(products));
  }

  getProducts(): Observable<Product[]> {
    return this.products$.asObservable();
  }

  getPagedProducts(
    skipCount: number,
    pageSize: number = 5
  ): Observable<PagedProducts> {
    return this.getProducts().pipe(
      map((products: Product[]) => {
        const pagedItems = products.slice(skipCount, skipCount + pageSize);
        return { items: pagedItems, totalCount: products.length };
      })
    );
  }

  deleteProduct(productId: number): void {
    const updatedProducts = this.products$.getValue().filter((product) => product.id !== productId);
    this.products$.next(updatedProducts);
  }

  editProduct(productId: number, updatedProduct: Product): void {
    // { ...product, ...updatedProduct } let me replace all properties of original product with the updated one
    const updatedProducts = this.products$.getValue().map((product) =>product.id === productId ? { ...product, ...updatedProduct } : product);
    this.products$.next(updatedProducts);
  }
}
