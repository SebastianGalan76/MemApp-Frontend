import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PopupContainerComponent } from "./shared/popup-container/popup-container.component";
import { PopupComponent } from './shared/popup-container/popup/popup.component';
import { PopupService } from '../service/popup.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PopupContainerComponent],
  template: `
    <router-outlet />
    <button (click)="test()">test</button>
    <popup-container>
  `,
  styles: [],
})
export class AppComponent {

  constructor(private popupService: PopupService) {

  }

  test() {
    this.popupService.showPopup(PopupComponent, []);
  }
}
