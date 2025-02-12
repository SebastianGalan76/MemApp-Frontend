import { Component, OnDestroy } from '@angular/core';
import { PostComponent } from '../post.component';
import { ApiService } from '../../../../../../service/api.service';
import { HttpParams } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { debounceTime, Subject, switchMap, takeUntil } from 'rxjs';
import { Response } from '../../../../../../model/response/Response';

@Component({
  selector: 'meme-rating-section',
  standalone: true,
  imports: [NgClass],
  templateUrl: './rating-section.component.html',
  styleUrl: './rating-section.component.scss'
})
export class RatingSectionComponent implements OnDestroy {
  private requestSubject = new Subject<HttpParams>();
  private destroy$ = new Subject<void>();

  constructor(
    public parent: PostComponent,
    private apiService: ApiService,
  ) {
    this.requestSubject.pipe(
      debounceTime(500),
      switchMap((param) => this.sendRequest(param)),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  rate(rating: -1 | 0 | 1) {
    if (rating == this.parent.post.user.rating) {
      rating = 0;
    }

    const params = new HttpParams()
      .set("post_id", this.parent.post.id)
      .set("rating_value", rating);

    //Removing previous rating
    this.parent.post.rating -= this.parent.post.user.rating;

    this.parent.post.rating += rating;
    this.parent.post.user.rating = rating;

    this.requestSubject.next(params);
  }

  private sendRequest(params: HttpParams) {
    return this.apiService.post<Response>('/post/rate', null, { withCredentials: true, params: params });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
