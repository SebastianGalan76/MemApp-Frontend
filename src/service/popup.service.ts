import { Injectable, Type } from '@angular/core';
import { PopupContainerComponent } from '../app/shared/popup-container/popup-container.component';
import { IPopup } from '../app/shared/popup-container/popup.interface';

@Injectable({
    providedIn: 'root'
})
export class PopupService {
    popupContainer!: PopupContainerComponent;

    setPopupContainer(popupContainer: PopupContainerComponent) {
        this.popupContainer = popupContainer;
    }

    showPopup(component: Type<IPopup>, data?: any[]): void {
        this.popupContainer.showPopup(component, data);
    }

    closePopup(id: number) {
        this.popupContainer.closePopup(id);
    }
}
