import { Injectable, inject, computed } from '@angular/core';
import { Product, PagedProducts } from '../models/model';
import { ProductsStore } from '../Products.store';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private store = inject(ProductsStore);

  constructor() {
    this.loadProducts();
  }

  private loadProducts(): void {
    console.log('Starting to load products...');
    let x = this.store.loadProducts();
    console.log(x);

  }

  getProducts() {
    return this.store.products();
  }

  getPagedProducts(skipCount: number, pageSize: number = 5) {
    return computed(() => this.store.pagedProducts()(skipCount, pageSize));
  }

  deleteProduct(productId: number): void {
    this.store.deleteProduct(productId);
  }

  editProduct(productId: number, updatedProduct: Product): void {
    this.store.editProduct(productId, updatedProduct);
  }
}