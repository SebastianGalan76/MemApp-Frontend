import { AfterViewInit, Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { PostComponent } from "./post/post.component";
import { Post } from '../../../../model/Post';
import { PageContainerComponent } from "../../../shared/page-container/page-container.component";
import { PostContainerService } from '../../../../service/post-container.service';

export interface PostElement {
  id: number;
  componentRef: ComponentRef<PostComponent>;
}

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

  postElements: PostElement[] = [];

  constructor(
    private postContainerService: PostContainerService,
  ) { }

  ngAfterViewInit(): void {
    this.postContainerService.load(null);

    this.postContainerService.postContainer$.subscribe({
      next: (response) => {
        if (response) {
          this.postContainer.clear();
          this.postElements.splice(0, this.postElements.length);

          response.content.forEach(postDto => this.addPostComponent(postDto))
        }
      }
    })
  }

  addPostComponent(post: Post) {
    const componentRef = this.postContainer.createComponent(PostComponent);
    componentRef.instance.post = post;

    this.postElements.push({
      id: post.id,
      componentRef: componentRef
    })
  }

  deletePost(id: number) {
    const index = this.postElements.findIndex(post => post.id == id);

    if (index >= 0) {
      const element = this.postElements[index];

      element.componentRef.destroy();
      this.postElements.splice(index, 1);
    }
  }
}
