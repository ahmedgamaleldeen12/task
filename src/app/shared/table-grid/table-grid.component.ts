import { Component, computed, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-table-grid',
  imports: [],
  templateUrl: './table-grid.component.html',
  styleUrl: './table-grid.component.css',
})
// extends { id: number } to make sure that every type has an id so we can track for loop effectively
export class TableGridComponent<T extends { id: number }> {
  data = input<T[]>([]);
  columns = input<{ key: keyof T; label: string }[]>([]);

  onEdit = output<T>();
  onDelete = output<number>();

  private sortColumn = signal<keyof T | ''>('');
  private sortDirection = signal<'asc' | 'desc'>('asc');


  sortedData = computed(() => {
    const column = this.sortColumn();
    if (!column) return this.data();

    const direction = this.sortDirection();
    return [...this.data()].sort((a, b) =>
      direction === 'asc' ? (a[column] > b[column] ? 1 : -1) : (a[column] < b[column] ? 1 : -1)
    );
  });
  sort(column: keyof T) {
    this.sortDirection.set(
      this.sortColumn() === column && this.sortDirection() === 'asc' ? 'desc' : 'asc'
    );
    this.sortColumn.set(column);
  }


  emitEdit(item: T) {
    this.onEdit.emit(item);
  }
  emitDelete(id: number) {
    this.onDelete.emit(id);
  }
}
