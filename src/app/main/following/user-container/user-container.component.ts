import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../service/api.service';
import { PageResponse } from '../../../../model/response/PageResponse';
import { User } from '../../../../model/User';
import { UserAvatarComponent } from "../../../shared/user/avatar/avatar.component";
import { NickComponent } from "../../../shared/user/nick/nick.component";

@Component({
  selector: 'following-user-container',
  standalone: true,
  imports: [UserAvatarComponent, NickComponent],
  templateUrl: './user-container.component.html',
  styleUrl: './user-container.component.scss'
})
export class FollowingUserContainerComponent implements OnInit {
  response: PageResponse<User> | null = null;

  constructor(
    private apiService: ApiService
  ) {

  }

  ngOnInit(): void {
    this.apiService.get<PageResponse<User>>('/follow/user/1', { withCredentials: true }).subscribe({
      next: (response) => {
        this.response = response;
      }
    })
  }


}
