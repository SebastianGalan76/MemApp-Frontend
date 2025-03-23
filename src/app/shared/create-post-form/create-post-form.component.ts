import { Component } from '@angular/core';
import { UserAvatarComponent } from "../user/avatar/avatar.component";
import { NickComponent } from "../user/nick/nick.component";
import { User } from '../../../model/User';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-post-form',
  standalone: true,
  imports: [UserAvatarComponent, NickComponent, DatePipe, AsyncPipe],
  templateUrl: './create-post-form.component.html',
  styleUrl: './create-post-form.component.scss'
})
export class CreatePostFormComponent {
  user$: Observable<User | null>;
  date: Date = new Date();

  constructor(
    userService: UserService,
    private router: Router
  ) {
    this.user$ = userService.getUser();
  }

  create(type: string | null = null) {
    if (type) {
      this.router.navigate(['create'], { queryParams: { type: type } })
    }
    else {
      this.router.navigate(['create'])
    }
  }
}
