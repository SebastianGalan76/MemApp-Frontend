import { Component } from '@angular/core';
import { MemeComponent } from '../meme.component';
import { ApiService } from '../../../../../../service/api.service';
import { HttpParams } from '@angular/common/http';
import { NgClass } from '@angular/common';

@Component({
  selector: 'meme-rating-section',
  standalone: true,
  imports: [NgClass],
  templateUrl: './rating-section.component.html',
  styleUrl: './rating-section.component.scss'
})
export class RatingSectionComponent {
  currentUserRating: -1 | 0 | 1 = 0;

  constructor(
    public parent: MemeComponent,
    private apiService: ApiService,
  ) { }

  rate(rating: -1 | 0 | 1) {
    if (rating == this.currentUserRating) {
      return;
    }

    const params = new HttpParams()
      .set("post_id", 1)
      .set("rating_value", rating);

    this.parent.rating += rating;
    this.currentUserRating = rating;

    this.apiService.post('/post/rate', null, { withCredentials: true, params: params }).subscribe({
      next: (response) => {

      },
      error: (response) => {
        //TODO Notification
      }
    })
  }
}
