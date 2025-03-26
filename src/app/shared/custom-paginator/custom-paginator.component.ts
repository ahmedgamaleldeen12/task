import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-custom-paginator',
  templateUrl: './custom-paginator.component.html',
  styleUrl: './custom-paginator.component.css',
})
export class CustomPaginatorComponent implements OnChanges {
  @Input({ required: true }) totalItems: number = 0;
  @Input() itemsPerPage: number = 5;
  @Output() pageIndexChanged = new EventEmitter<number>();

  currentPage: number = 1;
  totalPages: number = 0;
  pages: number[] = [];

  constructor() {}

  ngOnChanges(): void {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    if (this.currentPage > this.totalPages) {
      this.currentPage = Math.max(this.totalPages, 1);
      this.emitPageIndex();
    }
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.emitPageIndex();
    }
  }

  private emitPageIndex(): void {
    this.pageIndexChanged.emit((this.currentPage - 1) * this.itemsPerPage);
  }
}
