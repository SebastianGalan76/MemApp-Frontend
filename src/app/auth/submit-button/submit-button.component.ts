import { NgClass } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { LottieComponent } from 'ngx-lottie';

export enum ButtonStatus {
  ACTIVE = 'active', LOADING = 'loading', DISABLED = 'disabled'
}

@Component({
  selector: 'auth-submit-button',
  standalone: true,
  imports: [LottieComponent, NgClass],
  templateUrl: './submit-button.component.html',
  styleUrl: './submit-button.component.scss'
})
export class AuthSubmitButtonComponent {
  @Input({ required: true }) text!: string;
  @Input({ required: true }) status: ButtonStatus = ButtonStatus.ACTIVE;

  @Output() onSubmit = new EventEmitter<void>();

  submit() {
    if (this.status == ButtonStatus.ACTIVE) {
      this.onSubmit.next()
    }
  }

  @HostListener('document:keydown.enter')
  handleEnterKey() {
    this.submit();
  }
}
