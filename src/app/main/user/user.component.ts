import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { BehaviorSubject, switchMap } from 'rxjs';
import { ApiService } from '../../../service/api.service';
import { UserAvatarComponent } from "../../shared/user/avatar/avatar.component";
import { UserProfile } from '../../../model/UserProfile';
import { ObjectResponse } from '../../../model/response/ObjectResponse';
import { NickComponent } from "../../shared/user/nick/nick.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [UserAvatarComponent, NickComponent, RouterOutlet],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserPageComponent implements OnInit {
  user: UserProfile | null = null;
  isInitialized$ = new BehaviorSubject<boolean>(false);

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => this.apiService.get<ObjectResponse<UserProfile>>(`/profile/${params['login']}`, { withCredentials: true }))
    ).subscribe({
      next: (response) => {
        this.user = response.object;
        this.isInitialized$.next(true);
      }
    })
  }
}
