import { Component } from '@angular/core';
import { PostComponent } from "./post/post.component";

@Component({
  selector: 'app-post-container',
  standalone: true,
  imports: [PostComponent],
  templateUrl: './post-container.component.html',
  styleUrl: './post-container.component.scss'
})
export class PostContainerComponent {

}
