import { Component } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { PopupService } from '../../../../../service/popup.service';
import { SaveMemePopupComponent } from './popup/save-popup/save-popup.component';
import { ApiService } from '../../../../../service/api.service';
import { HttpParams } from '@angular/common/http';
import { RatingSectionComponent } from "./rating-section/rating-section.component";

@Component({
  selector: 'app-meme',
  standalone: true,
  imports: [MenuComponent, RatingSectionComponent],
  templateUrl: './meme.component.html',
  styleUrl: './meme.component.scss'
})
export class MemeComponent {
  rating: number = 421;

  constructor(
    private popupService: PopupService,
    private apiService: ApiService,
  ) { }

  save(): void {
    this.popupService.showPopup(SaveMemePopupComponent, []);
  }
}
