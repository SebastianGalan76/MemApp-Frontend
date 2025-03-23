import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostContainerComponent } from "./post-container/post-container.component";
import { UserAvatarComponent } from "../../shared/user/avatar/avatar.component";
import { ApiService } from '../../../service/api.service';
import { PostContainerService } from '../../../service/post-container.service';
import { PageResponse } from '../../../model/response/PageResponse';
import { Post } from '../../../model/Post';
import { UserService } from '../../../service/user.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { NickComponent } from "../../shared/user/nick/nick.component";
import { PopularHashtagComponent } from "./popular-hashtag/popular-hashtag.component";
import { User } from '../../../model/User';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, PostContainerComponent, UserAvatarComponent, AsyncPipe, NickComponent, PopularHashtagComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  user$: Observable<User | null>;

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private postContainerService: PostContainerService,
    private route: ActivatedRoute
  ) {
    this.user$ = userService.getUser();
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

