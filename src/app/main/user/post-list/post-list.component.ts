import { Component, OnInit } from '@angular/core';
import { PostContainerComponent } from "../../home/post-container/post-container.component";
import { ApiService } from '../../../../service/api.service';
import { PostContainerService } from '../../../../service/post-container.service';
import { ActivatedRoute } from '@angular/router';
import { PageResponse } from '../../../../model/response/PageResponse';
import { Post } from '../../../../model/Post';
import { UserPageComponent } from '../user.component';
import { filter, take } from 'rxjs';

@Component({
  selector: 'user-post-list',
  standalone: true,
  imports: [PostContainerComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class UserPostListComponent {
  page: number = 0;

  constructor(
    private parent: UserPageComponent,
    private apiService: ApiService,
    private postContainerService: PostContainerService,
    private route: ActivatedRoute
  ) {
    parent.isInitialized$
      .pipe(
        filter(isInitialized => isInitialized),
        take(1)
      )
      .subscribe(isInitialized => {
        if (isInitialized) {
          this.route.queryParams.subscribe(params => {
            var page = 1;
            if ('page' in params) {
              page = +params['page'];
            }

            this.loadPage(page - 1);
          });
        }
      })
  }

  loadPage(page: number) {
    this.apiService.get<PageResponse<Post>>(`/profile/${this.parent.user!.login}/post/${page}`, { withCredentials: true }).subscribe({
      next: (response) => {
        window.scrollTo({ top: 0 });

        this.postContainerService.load(response);
      },
    })
  }
}
