import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PageResponse } from '../model/response/PageResponse';
import { Post } from '../model/Post';
import { PageService } from './page.service';

@Injectable({
  providedIn: 'root'
})
export class PostContainerService {
  private postContainerSubject: BehaviorSubject<PageResponse<Post> | null> = new BehaviorSubject<PageResponse<Post> | null>(null);
  public postContainer$: Observable<PageResponse<Post> | null> = this.postContainerSubject.asObservable();

  constructor(
    private pageService: PageService
  ) {

  }

  public load(response: PageResponse<Post> | null) {
    this.postContainerSubject.next(response);

    this.pageService.load(response);
  }
}
