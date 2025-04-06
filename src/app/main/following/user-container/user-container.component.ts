import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../service/api.service';
import { PageResponse } from '../../../../model/response/PageResponse';
import { User } from '../../../../model/User';
import { UserAvatarComponent } from "../../../shared/user/avatar/avatar.component";
import { NickComponent } from "../../../shared/user/nick/nick.component";
import { HttpParams } from '@angular/common/http';
import { SortingFormComponent, SortOption } from "../../../shared/sorting-form/sorting-form.component";
import { PopularHashtagComponent } from "../../home/popular-hashtag/popular-hashtag.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PageContainerComponent } from "../../../shared/page-container/page-container.component";
import { PageService } from '../../../../service/page.service';

@Component({
  selector: 'following-user-container',
  standalone: true,
  imports: [UserAvatarComponent, NickComponent, SortingFormComponent, PopularHashtagComponent, RouterLink, PageContainerComponent],
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss', '../../../../style/layout.scss']
})
export class FollowingUserContainerComponent implements OnInit {
  response: PageResponse<User> | null = null;

  errorCode: number = -1;

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
    private apiService: ApiService,
    private pageService: PageService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      var page = 1;
      if ('page' in params) {
        page = +params['page'];
      }

      this.loadPage(this.sortOptions[0], page);
    });
  }

  loadPage(sortOption: SortOption, page: number) {
    this.errorCode = -1;

    var httpParams = new HttpParams()
      .append("sortBy", sortOption.sortBy)
      .append("order", sortOption.order);

    this.apiService.get<PageResponse<User>>(`/follow/user/${page}`, { withCredentials: true, params: httpParams }).subscribe({
      next: (response) => {

        if (response) {
          if ((response.number < 0 || response.number >= response.totalPages) && response.number != 0) {
            this.errorCode = 300;
          }
          else {
            if (response.totalElements == 0) {
              this.errorCode = 0;
            }
            else {
              this.response = response;
              this.pageService.load(response);
            }
          }
        }
      }
    })
  }
}
