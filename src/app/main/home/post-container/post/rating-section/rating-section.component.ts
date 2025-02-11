import { Component } from '@angular/core';
import { PostComponent } from '../post.component';
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
  constructor(
    public parent: PostComponent,
    private apiService: ApiService,
  ) { }

  rate(rating: -1 | 0 | 1) {
    if (rating == this.parent.post.user.rating) {
      return;
    }

    const params = new HttpParams()
      .set("post_id", 1)
      .set("rating_value", rating);

    this.parent.post.rating += rating;
    this.parent.post.user.rating = rating;

    this.apiService.post('/post/rate', null, { withCredentials: true, params: params }).subscribe({
      next: (response) => {

      },
      error: (response) => {
        //TODO Notification
      }
    })
  }
}
