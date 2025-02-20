import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ApiService } from '../../../../service/api.service';
import { PostPageComponent } from '../post.component';
import { PageResponse } from '../../../../model/response/PageResponse';
import { Comment } from '../../../../model/Comment';
import { take } from 'rxjs';
import { CommentComponent } from './comment/comment.component';
import { CreateCommentComponent } from "./create-comment/create-comment.component";

@Component({
  selector: 'app-comment-container',
  standalone: true,
  imports: [CreateCommentComponent],
  templateUrl: './comment-container.component.html',
  styleUrl: './comment-container.component.scss'
})
export class CommentContainerComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;

  constructor(
    public parent: PostPageComponent,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.parent.isInitialized.pipe(
      take(1)
    ).subscribe(() => {
      this.apiService.get<PageResponse<Comment>>(`/comment/post/${this.parent.post.id}/0`, { withCredentials: true }).subscribe({
        next: (response) => {
          response.content.forEach(c => this.addCommentComponent(c));
        }
      })
    })
  }

  addCommentComponent(comment: Comment) {
    const componentRef = this.container.createComponent(CommentComponent);
    componentRef.instance.comment = comment;
  }

  addNewComment(comment: Comment) {
    this.parent.post.commentAmount++;

    this.addCommentComponent(comment);
  }
}
