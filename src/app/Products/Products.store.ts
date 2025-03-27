import { computed, inject } from '@angular/core';
import {
  signalStore,
  withComputed,
  withMethods,
  withState,
  patchState,
} from '@ngrx/signals';
import { Product, PagedProducts } from './models/model';
import { HttpClient } from '@angular/common/http';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map, pipe, switchMap, tap } from 'rxjs';

export type ProductsState = {
  products: Product[];
  isLoading: boolean;
};

const initialState: ProductsState = {
  products: [],
  isLoading: false,
};

export const ProductsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, http = inject(HttpClient)) => ({
    loadProducts: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true,})),
        switchMap(() =>
          http.get<{ products: Product[] }>('assets/Products.json').pipe(
            tap((response) => {
              console.log( response);
            }),
            map((response) => {
              return response.products;
            }),
            tap((products) => {
              patchState(store, {
                products,
                isLoading: false,
              });
            }),

          )
        )
      )
    ),

    deleteProduct: (productId: number) => {
      const updatedProducts = store
        .products()
        .filter((product) => product.id !== productId);
      patchState(store, {
        products: updatedProducts,
      });
    },

    editProduct: (productId: number, updatedProduct: Product) => {
      const updatedProducts = store
        .products()
        .map((product) =>
          product.id === productId ? { ...product, ...updatedProduct } : product
        );
      patchState(store, {
        products: updatedProducts,
      });
    },
  })),
  withComputed(({ products }) => ({
    pagedProducts: computed(() => (skipCount: number, pageSize: number = 5) => {
      const allProducts = products();
      const pagedItems = allProducts.slice(skipCount, skipCount + pageSize);
      return {
        items: pagedItems,
        totalCount: allProducts.length,
      } as PagedProducts;
    }),
  }))
);
