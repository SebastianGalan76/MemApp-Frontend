import { Component, OnInit } from '@angular/core';
import { PostContainerComponent } from "../home/post-container/post-container.component";
import { ApiService } from '../../../service/api.service';
import { PostContainerService } from '../../../service/post-container.service';
import { ActivatedRoute } from '@angular/router';
import { ObjectResponse } from '../../../model/response/ObjectResponse';
import { UserCollection } from '../../../model/UserCollection';
import { UserAvatarComponent } from "../../shared/user/avatar/avatar.component";
import { NickComponent } from "../../shared/user/nick/nick.component";

@Component({
  selector: 'app-user-collection',
  standalone: true,
  imports: [PostContainerComponent, UserAvatarComponent, NickComponent],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss'
})
export class UserCollectionComponent implements OnInit {
  uuid: string = "";

  collection: UserCollection | null = null;

  constructor(
    private apiService: ApiService,
    private postContainerService: PostContainerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.uuid = params['uuid'];

      this.route.queryParams.subscribe(params => {
        var page = 1;
        if ('page' in params) {
          page = +params['page'];
        }

        this.loadPage(page - 1);
      })
    })
  }

  loadPage(page: number) {
    this.apiService.get<ObjectResponse<UserCollection>>(`/collection/${this.uuid}/${page}`, { withCredentials: true }).subscribe({
      next: (response) => {
        window.scrollTo({ top: 0 });
        this.collection = response.object;

        this.postContainerService.load(response.object.content);
      },
    })
  }
}
