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
import { BasePaginatedComponent } from '../../../shared/base-paginated/base-paginated.component';

@Component({
  selector: 'following-user-container',
  standalone: true,
  imports: [UserAvatarComponent, NickComponent, SortingFormComponent, PopularHashtagComponent, RouterLink, PageContainerComponent],
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss', '../../../../style/layout.scss']
})
export class FollowingUserContainerComponent extends BasePaginatedComponent implements OnInit {
  response: PageResponse<User> | null = null;
  sortOption: SortOption | null = null;

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
    protected override route: ActivatedRoute
  ) {
    super(route);
  }

  override loadPage(page: number) {
    this.errorCode = -1;

    var httpParams;
    if (this.sortOption) {
      httpParams = new HttpParams()
        .append("sortBy", this.sortOption.sortBy)
        .append("order", this.sortOption.order);
    }

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

  changeSortOption(sortOption: SortOption) {
    this.sortOption = sortOption;
    this.loadPage(1);
  }
}
