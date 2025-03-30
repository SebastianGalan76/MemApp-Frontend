import { Component, OnInit } from '@angular/core';
import { PostContainerComponent } from "../home/post-container/post-container.component";
import { PopularHashtagComponent } from "../home/popular-hashtag/popular-hashtag.component";
import { User } from '../../../model/User';
import { UserService } from '../../../service/user.service';
import { ApiService } from '../../../service/api.service';
import { Observable } from 'rxjs';
import { PostContainerService } from '../../../service/post-container.service';
import { ActivatedRoute } from '@angular/router';
import { PageResponse } from '../../../model/response/PageResponse';
import { Post } from '../../../model/Post';
import { FollowingUserContainerComponent } from "./user-container/user-container.component";

@Component({
  selector: 'app-following',
  standalone: true,
  imports: [PostContainerComponent, PopularHashtagComponent, FollowingUserContainerComponent],
  templateUrl: './following.component.html',
  styleUrl: './following.component.scss'
})
export class FollowingPageComponent implements OnInit {
  user$: Observable<User | null>;

  userListIsActive: boolean = false;

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
    this.apiService.get<PageResponse<Post>>(`/follow/post/${page}`, { withCredentials: true }).subscribe({
      next: (response) => {
        window.scrollTo({ top: 0 });

        this.postContainerService.load(response);
      },
    })
  }
}
