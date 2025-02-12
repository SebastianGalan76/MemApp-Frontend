import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PopupContainerComponent } from "./shared/popup-container/popup-container.component";
import { ToastComponent } from "./shared/toast/toast.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PopupContainerComponent, ToastComponent],
  template: `
    <toast-container />
    <router-outlet />
    <popup-container>
  `,
  styles: [],
})
export class AppComponent {
}
