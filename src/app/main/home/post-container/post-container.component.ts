import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { PostComponent } from "./post/post.component";
import { ApiService } from '../../../../service/api.service';
import { Post } from '../../../../model/Post';

@Component({
  selector: 'app-post-container',
  standalone: true,
  imports: [PostComponent],
  templateUrl: './post-container.component.html',
  styleUrl: './post-container.component.scss'
})
export class PostContainerComponent implements AfterViewInit {
  @ViewChild('postContainer', { read: ViewContainerRef, static: true }) postContainer!: ViewContainerRef;

  constructor(
    private apiService: ApiService
  ) { }

  ngAfterViewInit(): void {
    this.apiService.get<Post[]>("/post/all", { withCredentials: true }).subscribe({
      next: (response) => {
        response.forEach(postDto => this.addPostComponent(postDto))
      },
    })
  }

  addPostComponent(post: Post) {
    const componentRef = this.postContainer.createComponent(PostComponent);
    componentRef.instance.post = post;
  }
}
