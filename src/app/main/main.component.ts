import { Component } from '@angular/core';
import { AsideMenuComponent } from "./aside-menu/aside-menu.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [AsideMenuComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
