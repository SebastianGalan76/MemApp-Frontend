import { ChangeDetectorRef, Component, ComponentRef, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { IPopup } from './popup.interface';
import { PopupService } from '../../../service/popup.service';

export class Popup {
  id!: number;
  componentRef!: ComponentRef<IPopup> | null;

  constructor(id: number, componentRef: ComponentRef<IPopup> | null) {
    this.id = id;
    this.componentRef = componentRef;
  }
}

@Component({
  selector: 'popup-container',
  standalone: true,
  imports: [],
  templateUrl: './popup-container.component.html',
  styleUrl: './popup-container.component.scss'
})
export class PopupContainerComponent {
  @ViewChild('popupContainer', { read: ViewContainerRef }) popupContainer!: ViewContainerRef;

  popups: Popup[] = [];

  constructor(private popupService: PopupService, private cdr: ChangeDetectorRef) {
    this.popupService.setPopupContainer(this);
  }

  showPopup(component: Type<IPopup>, data?: any[]): void {
    const popup = new Popup(this.popups.length, null);

    this.popups.push(popup);
    this.cdr.detectChanges();

    if (this.popupContainer) {
      const componentRef: ComponentRef<IPopup> = this.popupContainer.createComponent<IPopup>(component);
      popup.componentRef = componentRef;

      componentRef.setInput('popup', popup);

      if (data) {
        data.forEach((element: { name: string; value: unknown; }) => {
          componentRef.setInput(element.name, element.value);
        });
      }
    }
  }

  closePopup(id: number): void {
    setTimeout(() => {
      const popupIndex = this.popups.findIndex(popup => popup.id === id);

      if (popupIndex === -1) {
        return;
      }

      this.popups[popupIndex].componentRef?.instance.onClose();
      this.popups[popupIndex].componentRef!.destroy();
      this.popups.splice(popupIndex, 1);
    }, 2000);
  }
}
