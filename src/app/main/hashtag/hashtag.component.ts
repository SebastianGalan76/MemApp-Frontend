import { Component, OnInit } from '@angular/core';
import { PostContainerComponent } from "../home/post-container/post-container.component";
import { PopularHashtagComponent } from "../home/popular-hashtag/popular-hashtag.component";
import { ApiService } from '../../../service/api.service';
import { PostContainerService } from '../../../service/post-container.service';
import { ActivatedRoute } from '@angular/router';
import { PageResponse } from '../../../model/response/PageResponse';
import { Post } from '../../../model/Post';
import { BasePaginatedComponent } from '../../shared/base-paginated/base-paginated.component';

@Component({
  selector: 'app-hashtag-page',
  standalone: true,
  imports: [PostContainerComponent, PopularHashtagComponent],
  templateUrl: './hashtag.component.html',
  styleUrls: ['./hashtag.component.scss', '../../../style/layout.scss']
})
export class HashtagPageComponent extends BasePaginatedComponent implements OnInit {
  tag: string | null = null;

  constructor(
    private apiService: ApiService,
    private postContainerService: PostContainerService,
    protected override route: ActivatedRoute
  ) {
    super(route);
  }

  override ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if ('v' in params) {
        this.tag = params['v'];
      }

      super.ngOnInit();
    });
  }

  override loadPage(page: number) {
    if (!this.tag) {
      return;
    }

    this.apiService.get<PageResponse<Post>>(`/post/tag/${this.tag}/${page}`, { withCredentials: true }).subscribe({
      next: (response) => {
        window.scrollTo({ top: 0 });

        this.postContainerService.load(response);
      },
    })
  }
}