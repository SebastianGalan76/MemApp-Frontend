import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PopupComponent } from '../popup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-action',
  standalone: true,
  imports: [],
  templateUrl: './confirm-action.component.html',
  styleUrl: './confirm-action.component.scss'
})
export class ConfirmActionPopupComponent {
  @Input() text: string = "Czy na pewno chcesz to zrobić?";
  @Input() description: string = "Operacji nie można cofnąć."

  @Input() confirmText: string = "Tak";
  @Input() cancelText: string = "Nie";

  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  constructor(
    private parent: PopupComponent
  ) { }

  confirm() {
    this.onConfirm.emit();

    this.close();
  }

  cancel() {
    this.onCancel.emit();

    this.close();
  }

  close() {
    this.parent.close();
  }
}
