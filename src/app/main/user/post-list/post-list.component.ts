import { Component } from '@angular/core';
import { PostContainerComponent } from "../../home/post-container/post-container.component";

@Component({
  selector: 'user-post-list',
  standalone: true,
  imports: [PostContainerComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class UserPostListComponent {

}
