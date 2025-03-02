import { Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ApiService } from '../../../../service/api.service';
import { PostPageComponent } from '../post.component';
import { PageResponse } from '../../../../model/response/PageResponse';
import { Comment } from '../../../../model/Comment';
import { take } from 'rxjs';
import { CommentComponent } from './comment/comment.component';
import { CreateCommentComponent } from "./create-comment/create-comment.component";
import { ToastService, ToastType } from '../../../../service/toast.service';
import { Response } from '../../../../model/response/Response';

export interface CommentElement {
  id: number;
  componentRef: ComponentRef<CommentComponent>
}

@Component({
  selector: 'app-comment-container',
  standalone: true,
  imports: [CreateCommentComponent],
  templateUrl: './comment-container.component.html',
  styleUrl: './comment-container.component.scss'
})
export class CommentContainerComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;

  comments: CommentElement[] = [];
  page: number = 0;
  hasNextPage: boolean = false;

  constructor(
    public parent: PostPageComponent,
    private apiService: ApiService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.parent.isInitialized.pipe(
      take(1)
    ).subscribe(() => {
      this.load();
    })
  }

  loadMore() {
    this.load();
  }

  addCommentComponent(comment: Comment) {
    const componentRef = this.container.createComponent(CommentComponent);
    componentRef.instance.comment = comment;

    this.comments.push({
      id: comment.id,
      componentRef: componentRef
    })
  }

  addNewComment(comment: Comment) {
    this.parent.post.commentAmount++;

    const componentRef = this.container.createComponent(CommentComponent, { index: 0 });
    componentRef.instance.comment = comment;

    this.comments.push({
      id: comment.id,
      componentRef: componentRef
    })
  }

  delete(id: number) {
    this.apiService.delete<Response>(`/comment/${id}`, { withCredentials: true })
      .subscribe({
        next: (response) => {
          const index = this.comments.findIndex(comment => comment.id === id);

          if (index !== -1) {
            this.comments[index].componentRef.destroy();
            this.comments.splice(index, 1);

            this.parent.post.commentAmount--;
          }

          this.toastService.show(response.message);
        },
        error: (response) => {
          if (response.error) {
            this.toastService.show(response.error.message, ToastType.ERROR);
          }
        }
      })
  }

  load() {
    this.apiService.get<PageResponse<Comment>>(`/comment/post/${this.parent.post.id}/${this.page}`, { withCredentials: true }).subscribe({
      next: (response) => {
        response.content.forEach(c => this.addCommentComponent(c));
        this.hasNextPage = !response.last;
        this.page++;
      }
    })
  }
}
