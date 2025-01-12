import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PopupContainerComponent } from "./shared/popup-container/popup-container.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PopupContainerComponent],
  template: `
    <router-outlet />
    <popup-container>
  `,
  styles: [],
})
export class AppComponent {
}
