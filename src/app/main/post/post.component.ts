import { Component, OnInit } from '@angular/core';
import { Post } from '../../../model/Post';
import { PostComponent } from "../home/post-container/post/post.component";
import { ApiService } from '../../../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, switchMap, tap } from 'rxjs';
import { CommentContainerComponent } from "./comment-container/comment-container.component";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [PostComponent, CommentContainerComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostPageComponent implements OnInit {
  isInitialized = new Subject<void>();
  post!: Post;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    window.scrollTo({ top: 0 });

    this.route.params.pipe(
      switchMap(params => this.apiService.get<Post>(`/post/${params['id']}`, { withCredentials: true }))
    ).subscribe({
      next: (response) => {
        this.post = response;
        this.isInitialized.next();
      }
    })
  }
}
