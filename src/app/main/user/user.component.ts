import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { BehaviorSubject, switchMap } from 'rxjs';
import { ApiService } from '../../../service/api.service';
import { UserAvatarComponent } from "../../shared/user/avatar/avatar.component";
import { UserProfile } from '../../../model/UserProfile';
import { ObjectResponse } from '../../../model/response/ObjectResponse';
import { NickComponent } from "../../shared/user/nick/nick.component";
import { FollowButtonComponent } from "./follow-button/follow-button.component";
import { User } from '../../../model/User';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [UserAvatarComponent, NickComponent, RouterOutlet, FollowButtonComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss', '../../../style/layout.scss']
})
export class UserPageComponent implements OnInit {
  userProfile: UserProfile | null = null;
  user: User | null = null;

  isOwnProfile: boolean = false;

  isInitialized$ = new BehaviorSubject<boolean>(false);

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    window.scrollTo({ top: 0 });

    this.route.params.pipe(
      switchMap(params =>
        this.apiService.get<ObjectResponse<UserProfile>>(`/profile/${params['login']}`, { withCredentials: true })
      ),
      switchMap(response => {
        this.userProfile = response.object;
        this.isInitialized$.next(true);

        return this.userService.getUser();
      })
    ).subscribe({
      next: (user) => {
        this.user = user

        if (this.user && this.userProfile && this.user.id == this.userProfile.id) {
          this.isOwnProfile = true;
        }
      }
    })
  }

  selectSection(path: string | null) {
    if (path) {
      this.router.navigate(['/user', this.userProfile?.login, path]);
    }
    else {
      this.router.navigate(['/user', this.userProfile?.login]);
    }
  }
}
