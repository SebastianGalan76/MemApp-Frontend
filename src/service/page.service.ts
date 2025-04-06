import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PageResponse } from '../model/response/PageResponse';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private postContainerSubject: BehaviorSubject<PageResponse<any> | null> = new BehaviorSubject<PageResponse<any> | null>(null);
  public postContainer$: Observable<PageResponse<any> | null> = this.postContainerSubject.asObservable();

  public load(response: PageResponse<any> | null) {
    this.postContainerSubject.next(response);
  }
}
