import { Component, Input } from '@angular/core';
import { IPopup } from '../popup.interface';
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
export class PopupComponent implements IPopup {
  @Input({ required: true }) popup!: Popup;
  isActive: boolean = true;

  constructor(
    private popupService: PopupService
  ) {

  }

  active() {
    this.popupService.showPopup(PopupComponent, []);
  }

  close(): void {
    if (!this.isActive) {
      return;
    }

    this.isActive = false;
    this.popupService.closePopup(this.popup.id);
  }

  onClose(): void {

  }
}
