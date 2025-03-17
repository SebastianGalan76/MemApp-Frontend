import { Component, OnInit } from '@angular/core';
import { PostContainerComponent } from "../home/post-container/post-container.component";
import { User, UserService } from '../../../service/user.service';
import { ApiService } from '../../../service/api.service';
import { PostContainerService } from '../../../service/post-container.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PageResponse } from '../../../model/response/PageResponse';
import { Post } from '../../../model/Post';

@Component({
  selector: 'app-waiting-room',
  standalone: true,
  imports: [PostContainerComponent],
  templateUrl: './waiting-room.component.html',
  styleUrl: './waiting-room.component.scss'
})
export class WaitingRoomComponent implements OnInit {
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
    this.apiService.get<PageResponse<Post>>(`/post/waiting/${page}`, { withCredentials: true }).subscribe({
      next: (response) => {
        window.scrollTo({ top: 0 });

        this.postContainerService.load(response);
      },
    })
  }
}