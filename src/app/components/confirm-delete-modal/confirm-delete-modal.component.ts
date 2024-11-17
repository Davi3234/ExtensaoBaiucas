import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-delete-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirm-delete-modal.component.html',
  styleUrl: './confirm-delete-modal.component.css'
})
export class ConfirmDeleteModalComponent {
  @Input() itemName?: string
  @Output() onConfirm = new EventEmitter<void>()
  @Output() onCancel = new EventEmitter<void>()

  constructor(public activeModal: NgbActiveModal) {}

  confirm(): void {
    this.onConfirm.emit();
    this.activeModal.close();
  }

  cancel(): void {
    this.onCancel.emit();
    this.activeModal.dismiss();
  }
}
