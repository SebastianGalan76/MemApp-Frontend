import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { PostComponent } from "./post/post.component";
import { ApiService } from '../../../../service/api.service';
import { Post } from '../../../../model/Post';
import { PageResponse } from '../../../../model/response/PageResponse';
import { PageContainerComponent } from "../../../shared/page-container/page-container.component";
import { PostContainerService } from '../../../../service/post-container.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-container',
  standalone: true,
  imports: [PageContainerComponent],
  templateUrl: './post-container.component.html',
  styleUrl: './post-container.component.scss'
})
export class PostContainerComponent implements AfterViewInit {
  @ViewChild('postContainer', { read: ViewContainerRef, static: true }) postContainer!: ViewContainerRef;
  page: number = 0;

  constructor(
    private apiService: ApiService,
    private postContainerService: PostContainerService,
    private route: ActivatedRoute,
  ) { }

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe(params => {
      if ('page' in params) {
        const number = +params['page'];
        this.loadPage(number - 1);
      }
      else {
        this.loadPage(0);
      }
    })
  }

  addPostComponent(post: Post) {
    const componentRef = this.postContainer.createComponent(PostComponent);
    componentRef.instance.post = post;
  }

  private loadPage(page: number) {
    this.apiService.get<PageResponse<Post>>(`/post/home/${page}`, { withCredentials: true }).subscribe({
      next: (response) => {
        window.scrollTo({ top: 0 });

        this.postContainer.clear();
        this.postContainerService.load(response);
        response.content.forEach(postDto => this.addPostComponent(postDto))
      },
    })
  }
}
