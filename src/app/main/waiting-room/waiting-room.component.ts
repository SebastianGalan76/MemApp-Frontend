import { Component, OnInit } from '@angular/core';
import { PostContainerComponent } from "../home/post-container/post-container.component";
import { ApiService } from '../../../service/api.service';
import { PostContainerService } from '../../../service/post-container.service';
import { ActivatedRoute } from '@angular/router';
import { PageResponse } from '../../../model/response/PageResponse';
import { Post } from '../../../model/Post';
import { PopularHashtagComponent } from "../home/popular-hashtag/popular-hashtag.component";
import { BasePaginatedComponent } from '../../shared/base-paginated/base-paginated.component';

@Component({
  selector: 'app-waiting-room',
  standalone: true,
  imports: [PostContainerComponent, PopularHashtagComponent],
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss', '../../../style/layout.scss']
})
export class WaitingRoomComponent extends BasePaginatedComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private postContainerService: PostContainerService,
    protected override route: ActivatedRoute
  ) {
    super(route);
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