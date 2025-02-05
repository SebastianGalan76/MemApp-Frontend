import { Component } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { PopupService } from '../../../../../service/popup.service';
import { SaveMemePopupComponent } from './popup/save-popup/save-popup.component';

@Component({
  selector: 'app-meme',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './meme.component.html',
  styleUrl: './meme.component.scss'
})
export class MemeComponent {

  constructor(
    private popupService: PopupService
  ) { }

  save(): void {
    this.popupService.showPopup(SaveMemePopupComponent, []);
  }
}
