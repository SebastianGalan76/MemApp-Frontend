import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { Popup } from '../popup-container.component';
import { PopupService } from '../../../../service/popup.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [NgClass],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {
  @ViewChild('popupContainer', { read: ViewContainerRef, static: true }) popupContainer!: ViewContainerRef;

  @Input({ required: true }) popup!: Popup;
  @Input() backgroundClickClosePopup: boolean = true;

  isActive: boolean = true;

  private isMouseDownInsideContainer = false;

  constructor(
    protected popupService: PopupService
  ) { }

  setContent(component: any) {
    this.popupContainer.clear();
    const componentRef = this.popupContainer.createComponent(component);

    if (this.popup.data) {
      this.popup.data.forEach((element: { name: string; value: unknown; }) => {
        componentRef.setInput(element.name, element.value);
      });
    }

    this.popup.componentRef = componentRef;
  }

  close(): void {
    if (!this.isActive) {
      return;
    }

    this.isActive = false;
    this.popupService.closePopup(this.popup.id);
  }

  onMouseDown(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.isMouseDownInsideContainer = true;
    }
  }

  onMouseUp(event: MouseEvent) {
    if (this.isMouseDownInsideContainer && event.target === event.currentTarget) {
      if (this.backgroundClickClosePopup) {
        this.close();
      }
    }
    this.isMouseDownInsideContainer = false;
  }
}
