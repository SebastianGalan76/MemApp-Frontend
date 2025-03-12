import { ChangeDetectorRef, Component, ComponentRef, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { PopupService } from '../../../service/popup.service';
import { PopupComponent } from './popup/popup.component';
import { Observable, Subject } from 'rxjs';
import { ConfirmActionPopupComponent } from './popup/confirm-action/confirm-action.component';

export class Popup {
  id!: number;
  componentRef!: ComponentRef<any> | null;
  component!: Type<any>;
  data?: any[];

  constructor(id: number, componentRef: ComponentRef<any> | null, component: Type<any>, data?: any[]) {
    this.id = id;
    this.componentRef = componentRef;
    this.component = component;
    this.data = data;
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

  showPopup(component: Type<any>, data?: any[], options?: any[]): void {
    const popup = new Popup(this.popups.length, null, component, data);

    this.popups.push(popup);
    this.cdr.detectChanges();

    if (this.popupContainer) {
      const componentRef = this.popupContainer.createComponent(PopupComponent);
      if (options) {
        options.forEach((element: { name: string; value: unknown; }) => {
          componentRef.setInput(element.name, element.value);
        });
      }

      const popupComponent = componentRef.instance;
      componentRef.setInput('popup', popup);
      popupComponent.setContent(component);
    }
  }

  showConfirmPopup(data?: any[], options?: any[]): Observable<any> {
    const popup = new Popup(this.popups.length, null, ConfirmActionPopupComponent, data);

    this.popups.push(popup);
    this.cdr.detectChanges();

    if (this.popupContainer) {
      const componentRef = this.popupContainer.createComponent(PopupComponent);

      if (options) {
        options.forEach((element: { name: string; value: unknown; }) => {
          componentRef.setInput(element.name, element.value);
        });
      }

      const popupComponent = componentRef.instance;
      componentRef.setInput('popup', popup);
      popupComponent.setContent(ConfirmActionPopupComponent);

      if (popup.componentRef) {
        const instance = popup.componentRef.instance as ConfirmActionPopupComponent;
        const resultSubject = new Subject<any>();

        instance.onConfirm.subscribe(() => {
          resultSubject.next({ event: 'confirm' });
        });
        instance.onCancel.subscribe(() => {
          resultSubject.next({ event: 'cancel' });
        });

        return resultSubject.asObservable();
      }
    }

    return new Observable<any>();
  }

  closePopup(id: number): void {
    const popupIndex = this.popups.findIndex(popup => popup.id === id);

    if (popupIndex === -1) {
      return;
    }

    const popup = this.popups[popupIndex];

    setTimeout(() => {
      if (popup.componentRef) {
        this.popups[popupIndex].componentRef!.destroy();
      }
      this.popups.splice(popupIndex, 1);
    }, 2000);
  }
}
