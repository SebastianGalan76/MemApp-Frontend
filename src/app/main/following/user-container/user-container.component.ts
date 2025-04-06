import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../service/api.service';
import { PageResponse } from '../../../../model/response/PageResponse';
import { User } from '../../../../model/User';
import { UserAvatarComponent } from "../../../shared/user/avatar/avatar.component";
import { NickComponent } from "../../../shared/user/nick/nick.component";
import { HttpParams } from '@angular/common/http';
import { SortingFormComponent, SortOption } from "../../../shared/sorting-form/sorting-form.component";
import { PopularHashtagComponent } from "../../home/popular-hashtag/popular-hashtag.component";
import { PageContainerComponent } from "../../../shared/page-container/page-container.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'following-user-container',
  standalone: true,
  imports: [UserAvatarComponent, NickComponent, SortingFormComponent, PopularHashtagComponent, PageContainerComponent, RouterLink],
  templateUrl: './user-container.component.html',
  styleUrl: './user-container.component.scss'
})
export class FollowingUserContainerComponent implements OnInit {
  response: PageResponse<User> | null = null;

  sortOptions: SortOption[] = [{
    text: 'Od najnowszych',
    sortBy: 'followedAt',
    order: 'desc'
  }, {
    text: 'Od najstarszych',
    sortBy: 'followedAt',
    order: 'asc'
  }, {
    text: 'Login A-Z',
    sortBy: 'login',
    order: 'asc'
  }, {
    text: 'Login Z-A',
    sortBy: 'login',
    order: 'desc'
  }]

  constructor(
    private apiService: ApiService
  ) {

  }

  ngOnInit(): void {
    this.loadData(this.sortOptions[0]);
  }

  loadData(sortOption: SortOption) {
    var httpParams = new HttpParams()
      .append("sortBy", sortOption.sortBy)
      .append("order", sortOption.order);

    this.apiService.get<PageResponse<User>>('/follow/user/1', { withCredentials: true, params: httpParams }).subscribe({
      next: (response) => {
        this.response = response;
      }
    })
  }
}
