import { Component } from '@angular/core';
import { UserPageComponent } from '../user.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-collection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-collection.component.html',
  styleUrl: './post-collection.component.scss'
})
export class UserPostCollectionComponent {

  constructor(
    public parent: UserPageComponent,
    private router: Router
  ) {

  }

  selectList(uuid: string) {
    this.router.navigate(['list', uuid]);
  }
}
