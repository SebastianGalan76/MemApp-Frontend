import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { debounceTime, Subject, switchMap, takeUntil } from 'rxjs';
import { CommentComponent } from '../comment.component';
import { ApiService } from '../../../../../../service/api.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'comment-rating-section',
  standalone: true,
  imports: [NgClass],
  templateUrl: './rating-section.component.html',
  styleUrl: './rating-section.component.scss'
})
export class RatingSectionComponent {
  private requestSubject = new Subject<HttpParams>();
  private destroy$ = new Subject<void>();

  constructor(
    public parent: CommentComponent,
    private apiService: ApiService,
  ) {
    this.requestSubject.pipe(
      debounceTime(500),
      switchMap((param) => this.sendRequest(param)),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  rate(rating: -1 | 0 | 1, event: MouseEvent) {
    event.stopPropagation();

    const params = new HttpParams()
      .set("comment_id", this.parent.comment.id)
      .set("rating_value", rating);

    if (this.parent.comment.userRating == -1) {
      if (rating == -1) {
        //Removing previous rating
        this.parent.comment.dislikeAmount -= 1;

        rating = 0;
      }
      else if (rating == 1) {
        this.parent.comment.dislikeAmount -= 1;
        this.parent.comment.likeAmount += 1;
      }
    }
    else if (this.parent.comment.userRating == 1) {
      if (rating == 1) {
        //Removing previous rating
        this.parent.comment.likeAmount -= 1;

        rating = 0;
      }
      else if (rating == -1) {
        this.parent.comment.likeAmount -= 1;
        this.parent.comment.dislikeAmount += 1;
      }
    }
    else {
      if (rating == 1) {
        this.parent.comment.likeAmount += 1;
      }
      else if (rating == -1) {
        this.parent.comment.dislikeAmount += 1;
      }
    }

    this.parent.comment.userRating = rating;
    this.requestSubject.next(params);
  }

  private sendRequest(params: HttpParams) {
    return this.apiService.post<Response>('/comment/rate', null, { withCredentials: true, params: params });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
