import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-ui-modal',
  imports: [],
  templateUrl: './ui-modal.component.html',
  styleUrl: './ui-modal.component.css',

})
export class UiModalComponent {
  @Input({ required: true }) isModalOpen: boolean = false;
  @Output() isModalOpenChange = new EventEmitter<boolean>(); // Notify parent

  closeModal() {
    this.isModalOpenChange.emit(false); // Emit event when modal is closed
  }
}
