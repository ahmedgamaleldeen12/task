import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-grid',
  imports: [],
  templateUrl: './table-grid.component.html',
  styleUrl: './table-grid.component.css',
})
export class TableGridComponent<T extends { id: number }> {
  @Input() data: T[] = [];
  @Input() columns: { key: keyof T; label: string }[] = [];
  @Output() onEdit = new EventEmitter<T>();
  @Output() onDelete = new EventEmitter<number>();

  sortColumn: keyof T | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  sort(column: keyof T) {
    this.sortDirection =
      this.sortColumn === column && this.sortDirection === 'asc'
        ? 'desc'
        : 'asc';
    this.sortColumn = column;

    this.data.sort((a, b) =>
      this.sortDirection === 'asc'
        ? a[column] > b[column]
          ? 1
          : -1
        : a[column] < b[column]
        ? 1
        : -1
    );
  }

  emitEdit(item: T) {
    this.onEdit.emit(item);
  }
  emitDelete(id: number) {
    this.onDelete.emit(id);
  }
}
