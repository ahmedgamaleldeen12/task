import { Component, inject, OnInit, signal } from '@angular/core';
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
import { ProductsStore } from './Products.store';

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
  readonly columns = signal<{ key: keyof Product; label: string }[]>([
    { key: 'id', label: 'Product ID' },
    { key: 'name', label: 'Name' },
    { key: 'category', label: 'Category' },
    { key: 'price', label: 'Price' },
    { key: 'stock', label: 'Stock' },
    { key: 'photo', label: 'Photo' },
  ]);
  products = signal<PagedProducts>({ items: [], totalCount: 0 });

  editModalFlag = signal<boolean>(false);
  deleteModalFlag = signal<boolean>(false);
  selectedProductId = signal<number>(0);
  editForm!: FormGroup;

  private readonly fb = inject(FormBuilder);
  private readonly _productsService = inject(ProductsService);
  private readonly route = inject(ActivatedRoute);

  readonly store = inject(ProductsStore);

  constructor() {}

  ngOnInit() {
    this.getProducts();
    // this.products.set(this.route.snapshot.data['productsData']);
    this.initForm();
  }
  getProducts(skipCount: number = 0) {
    // console.log(this._productsService.getPagedProducts(0));
    this.products.set(this._productsService.getPagedProducts(skipCount)())
    console.log(this.products())
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
    this.editModalFlag.set(true);
  }
  confirmEdit() {
    const updatedProduct: Product = this.editForm.value;
    this._productsService.editProduct(updatedProduct.id, updatedProduct);
    this.getProducts();
    this.editModalFlag.set(false);
  }

  openDeleteModal(id: number) {
    this.selectedProductId.set(id);
    this.deleteModalFlag.set(true);
  }

  confirmDelete() {
    if (this.selectedProductId() !== 0) {
      this._productsService.deleteProduct(this.selectedProductId());
      this.getProducts();
      this.deleteModalFlag.set(false);
      this.selectedProductId.set(0);
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
