import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { PostComponent } from "./post/post.component";
import { Post } from '../../../../model/Post';
import { PageContainerComponent } from "../../../shared/page-container/page-container.component";
import { PostContainerService } from '../../../../service/post-container.service';

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
    private postContainerService: PostContainerService,
  ) { }

  ngAfterViewInit(): void {
    this.postContainerService.load(null);

    this.postContainerService.postContainer$.subscribe({
      next: (response) => {
        if (response) {
          this.postContainer.clear();
          response.content.forEach(postDto => this.addPostComponent(postDto))
        }
      }
    })
  }

  addPostComponent(post: Post) {
    const componentRef = this.postContainer.createComponent(PostComponent);
    componentRef.instance.post = post;
  }
}
