import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ui-modal',
  imports: [],
  templateUrl: './ui-modal.component.html',
  styleUrl: './ui-modal.component.css',
  
})
export class UiModalComponent {
  @Input({required : true}) isModalOpen: boolean = false;
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
