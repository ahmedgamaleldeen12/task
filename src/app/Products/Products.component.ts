import { Component, inject, OnInit } from '@angular/core';
import { CustomPaginatorComponent } from '../shared/custom-paginator/custom-paginator.component';
import { PagedProducts, Product } from './models/model';
import { TableGridComponent } from '../shared/table-grid/table-grid.component';
import { ProductsService } from './services/Products.service';
import { ActivatedRoute } from '@angular/router';
import { UiModalComponent } from '../shared/ui-modal/ui-modal.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-Products',
  templateUrl: './Products.component.html',
  styleUrls: ['./Products.component.css'],
  imports: [
    CustomPaginatorComponent,
    TableGridComponent,
    UiModalComponent,
    ReactiveFormsModule,
  ],
})
export class ProductsComponent implements OnInit {
  readonly  columns: { key: keyof Product; label: string }[] = [
    { key: 'id', label: 'Product ID' },
    { key: 'name', label: 'Name' },
    { key: 'category', label: 'Category' },
    { key: 'price', label: 'Price' },
    { key: 'stock', label: 'Stock' },
    { key: 'photo', label: 'Photo' },
  ];
  products: PagedProducts = { items: [], totalCount: 0 };

  editModalFlag: boolean = false;
  deleteModalFlag: boolean = false;
  selectedProductId: number | null = null;
  editForm!: FormGroup;

  private readonly fb = inject(FormBuilder);
  private readonly _productsService = inject(ProductsService);
  private readonly route = inject(ActivatedRoute);

  constructor() {}

  ngOnInit() {
    this.products = this.route.snapshot.data['productsData'];
    this.initForm();
  }
  getProducts(skipCount: number = 0) {
    this._productsService.getPagedProducts(skipCount).subscribe((data) => {
      this.products = data;
    });
  }
  onPageChange(skipCount: number) {
    this.getProducts(skipCount);
  }
  openEditModal(item: Product) {
    this.editForm.patchValue({
      id: item.id,
      name: item.name,
      category: item.category,
      price: item.price,
      stock: item.stock,
    });
    this.editModalFlag = true;
  }
  confirmEdit() {
    const updatedProduct: Product = this.editForm.value;
    this._productsService.editProduct(updatedProduct.id, updatedProduct);
    this.getProducts();
    this.editModalFlag = false;
  }

  openDeleteModal(id: number) {
    this.selectedProductId = id;
    this.deleteModalFlag = true;
  }

  confirmDelete() {
    if (this.selectedProductId !== null) {
      this._productsService.deleteProduct(this.selectedProductId);
      this.getProducts();
      this.deleteModalFlag = false;
      this.selectedProductId = null;
    }
  }

  initForm() {
    this.editForm = this.fb.group({
      id: new FormControl(null),
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      price: new FormControl(0, [Validators.required, Validators.min(1)]),
      stock: new FormControl(0, [Validators.required, Validators.min(1)]),
    });
  }
}
