import { Injectable, Type } from '@angular/core';
import { PopupContainerComponent } from '../app/shared/popup-container/popup-container.component';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PopupService {
    popupContainer!: PopupContainerComponent;

    setPopupContainer(popupContainer: PopupContainerComponent) {
        this.popupContainer = popupContainer;
    }

    showPopup(component: Type<any>, data?: any[], options?: any[]): void {
        this.popupContainer.showPopup(component, data, options);
    }

    showConfirmPopup(data?: any[], options?: any[]): Observable<any> {
        return this.popupContainer.showConfirmPopup(data, options)
    }

    closePopup(id: number) {
        this.popupContainer.closePopup(id);
    }
}
