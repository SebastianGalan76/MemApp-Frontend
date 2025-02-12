import { Component } from '@angular/core';
import { Toast, ToastService } from '../../../service/toast.service';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'toast-container',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  toasts: Toast[] = [];

  smallToasts: Toast[] = [];

  constructor(public toastService: ToastService) { }

  ngOnInit(): void {
    this.toastService.toasts$.subscribe(toasts => {
      this.toasts = toasts.filter(toast => toast.type != 'info');
      this.smallToasts = toasts.filter(toast => toast.type == 'info');
    })
  }
}
