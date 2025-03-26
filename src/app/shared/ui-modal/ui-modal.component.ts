import { Component, EventEmitter, input, Input, output, Output } from '@angular/core';

@Component({
  selector: 'app-ui-modal',
  imports: [],
  templateUrl: './ui-modal.component.html',
  styleUrl: './ui-modal.component.css',

})
export class UiModalComponent {
  isModalOpen = input<boolean>(false);
  isModalOpenChange = output<boolean>();

  closeModal() {
    this.isModalOpenChange.emit(false);
  }
}
