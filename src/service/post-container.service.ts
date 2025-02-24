import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PageResponse } from '../model/response/PageResponse';
import { Post } from '../model/Post';

@Injectable({
  providedIn: 'root'
})
export class PostContainerService {
  private postContainerSubject: BehaviorSubject<PageResponse<Post> | null> = new BehaviorSubject<PageResponse<Post> | null>(null);
  public postContainer$: Observable<PageResponse<Post> | null> = this.postContainerSubject.asObservable();

  public load(response: PageResponse<Post> | null) {
    this.postContainerSubject.next(response);
  }
}
