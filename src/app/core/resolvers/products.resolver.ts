import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PagedProducts } from '../../Products/models/model';
import { ProductsService } from '../../Products/services/Products.service';


@Injectable({
  providedIn: 'root'
})
export class ProductsResolver implements Resolve<PagedProducts> {
  private readonly _productsService = inject(ProductsService);
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<PagedProducts> {
    return this._productsService.getPagedProducts(0); 
  }
}
