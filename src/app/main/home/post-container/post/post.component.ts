import { Component } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { PopupService } from '../../../../../service/popup.service';
import { SaveMemePopupComponent } from './popup/save-popup/save-popup.component';
import { RatingSectionComponent } from "./rating-section/rating-section.component";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [MenuComponent, RatingSectionComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  rating: number = 421;

  constructor(
    private popupService: PopupService,
  ) { }

  save(): void {
    this.popupService.showPopup(SaveMemePopupComponent, []);
  }
}
