import {
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-custom-paginator',
  templateUrl: './custom-paginator.component.html',
  styleUrl: './custom-paginator.component.css',
})
export class CustomPaginatorComponent {
  totalItems = input<number>(0);
  itemsPerPage = input<number>(5);

  pageIndexChanged = output<number>();

  currentPage = signal(1);

  totalPages = computed(
    () => Math.ceil(this.totalItems() / this.itemsPerPage()) || 1
  );
  pages = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1)
  );

  constructor() {
    effect(() => {
      if (this.currentPage() > this.totalPages()) {
        this.currentPage.set(Math.max(this.totalPages(), 1));
      }
      this.emitPageIndex();
    });
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  private emitPageIndex(): void {
    this.pageIndexChanged.emit((this.currentPage() - 1) * this.itemsPerPage());
  }
}
