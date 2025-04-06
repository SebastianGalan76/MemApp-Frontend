import { Component, OnInit } from '@angular/core';
import { PostContainerComponent } from "../home/post-container/post-container.component";
import { PopularHashtagComponent } from "../home/popular-hashtag/popular-hashtag.component";
import { ApiService } from '../../../service/api.service';
import { PostContainerService } from '../../../service/post-container.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PageResponse } from '../../../model/response/PageResponse';
import { Post } from '../../../model/Post';
import { SortingFormComponent, SortOption } from "../../shared/sorting-form/sorting-form.component";

@Component({
  selector: 'app-following',
  standalone: true,
  imports: [PostContainerComponent, PopularHashtagComponent, SortingFormComponent, RouterLink],
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss', '../../../style/layout.scss']
})
export class FollowingPageComponent implements OnInit {
  sortOptions: SortOption[] = [{
    text: 'Od najnowszych',
    sortBy: 'followedAt',
    order: 'desc'
  }, {
    text: 'Od najstarszych',
    sortBy: 'followedAt',
    order: 'asc'
  }, {
    text: 'Login A-Z',
    sortBy: 'login',
    order: 'asc'
  }, {
    text: 'Login Z-A',
    sortBy: 'login',
    order: 'desc'
  }]

  constructor(
    private apiService: ApiService,
    private postContainerService: PostContainerService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      var page = 1;
      if ('page' in params) {
        page = +params['page'];
      }

      this.loadPage(page - 1);
    });
  }

  loadPage(page: number) {
    this.apiService.get<PageResponse<Post>>(`/follow/post/${page}`, { withCredentials: true }).subscribe({
      next: (response) => {
        window.scrollTo({ top: 0 });

        this.postContainerService.load(response);
      },
    })
  }
}
