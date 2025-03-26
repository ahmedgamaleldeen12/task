import { Component, inject, OnInit } from '@angular/core';
import { CustomPaginatorComponent } from '../shared/custom-paginator/custom-paginator.component';
import { PagedProducts, Product } from './models/model';
import { TableGridComponent } from '../shared/table-grid/table-grid.component';
import { ProductsService } from './services/Products.service';
import { ActivatedRoute } from '@angular/router';
import { UiModalComponent } from "../shared/ui-modal/ui-modal.component";

@Component({
  selector: 'app-Products',
  templateUrl: './Products.component.html',
  styleUrls: ['./Products.component.css'],
  imports: [CustomPaginatorComponent, TableGridComponent, UiModalComponent],
})
export class ProductsComponent implements OnInit {
  Columns: { key: keyof Product; label: string }[] = [
    { key: 'id', label: 'Product ID' },
    { key: 'name', label: 'Name' },
    { key: 'category', label: 'Category' },
    { key: 'price', label: 'Price' },
    { key: 'stock', label: 'Stock' },
    { key: 'photo', label: 'Photo' },
  ];
  products: PagedProducts = { items: [], totalCount: 0 };
  
  private readonly _productsService = inject(ProductsService);
  private readonly route = inject(ActivatedRoute);

  constructor() {}

  ngOnInit() {
    this.products = this.route.snapshot.data['productsData'];
  }
  getProducts(skipCount: number = 0) {
    this._productsService.getPagedProducts(skipCount).subscribe((data) => {
      this.products = data
      
    });
  }
  onPageChange(skipCount: number) {
    this.getProducts(skipCount);
  }
  deleteProduct(id : number){
    console.log(id)
  }
  edit(item : Product){
    console.log(item)
  }

  x:boolean = false
  open(){
      this.x =true;
  }
}
