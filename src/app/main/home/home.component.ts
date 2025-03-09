import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostContainerComponent } from "./post-container/post-container.component";
import { UserAvatarComponent } from "../../shared/user/avatar/avatar.component";
import { ApiService } from '../../../service/api.service';
import { PostContainerService } from '../../../service/post-container.service';
import { PageResponse } from '../../../model/response/PageResponse';
import { Post } from '../../../model/Post';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, PostContainerComponent, UserAvatarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

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
    this.apiService.get<PageResponse<Post>>(`/post/home/${page}`, { withCredentials: true }).subscribe({
      next: (response) => {
        window.scrollTo({ top: 0 });

        this.postContainerService.load(response);
      },
    })
  }
}

