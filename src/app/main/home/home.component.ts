import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostContainerComponent } from "./post-container/post-container.component";
import { ApiService } from '../../../service/api.service';
import { PostContainerService } from '../../../service/post-container.service';
import { PageResponse } from '../../../model/response/PageResponse';
import { Post } from '../../../model/Post';
import { UserService } from '../../../service/user.service';
import { Observable } from 'rxjs';
import { PopularHashtagComponent } from "./popular-hashtag/popular-hashtag.component";
import { User } from '../../../model/User';
import { CreatePostFormComponent } from "../../shared/create-post-form/create-post-form.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PostContainerComponent, PopularHashtagComponent, CreatePostFormComponent],
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

