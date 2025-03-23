import { Component, OnInit } from '@angular/core';
import { PostContainerComponent } from "../home/post-container/post-container.component";
import { PopularHashtagComponent } from "../home/popular-hashtag/popular-hashtag.component";
import { User, UserService } from '../../../service/user.service';
import { Observable } from 'rxjs';
import { ApiService } from '../../../service/api.service';
import { PostContainerService } from '../../../service/post-container.service';
import { ActivatedRoute } from '@angular/router';
import { PageResponse } from '../../../model/response/PageResponse';
import { Post } from '../../../model/Post';

@Component({
  selector: 'app-hashtag-page',
  standalone: true,
  imports: [PostContainerComponent, PopularHashtagComponent],
  templateUrl: './hashtag.component.html',
  styleUrl: './hashtag.component.scss'
})
export class HashtagPageComponent implements OnInit {
  tag: string | null = null;

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

      if ('v' in params) {
        this.tag = params['v'];
      }

      this.loadPage(page - 1);
    });
  }

  loadPage(page: number) {
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