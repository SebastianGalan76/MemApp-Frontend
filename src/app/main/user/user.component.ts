import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    window.scrollTo({ top: 0 });

    this.route.params.pipe(
      switchMap(params => this.apiService.get<ObjectResponse<UserProfile>>(`/profile/${params['login']}`, { withCredentials: true }))
    ).subscribe({
      next: (response) => {
        this.user = response.object;
        this.isInitialized$.next(true);
      }
    })
  }

  selectSection(path: string | null) {
    if (path) {
      this.router.navigate(['/user', this.user?.login, path]);
    }
    else {
      this.router.navigate(['/user', this.user?.login]);
    }
  }
}
