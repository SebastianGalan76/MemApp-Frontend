import { Component, OnInit } from '@angular/core';
import { PostContainerComponent } from "../home/post-container/post-container.component";
import { ApiService } from '../../../service/api.service';
import { PostContainerService } from '../../../service/post-container.service';
import { ActivatedRoute } from '@angular/router';
import { PageResponse } from '../../../model/response/PageResponse';
import { Post } from '../../../model/Post';
import { PopularHashtagComponent } from "../home/popular-hashtag/popular-hashtag.component";
import { BasePaginatedComponent } from '../../shared/base-paginated/base-paginated.component';
import { SortOption, SortingFormComponent } from '../../shared/sorting-form/sorting-form.component';
import { HttpParams } from '@angular/common/http';
import { Utils } from '../../../service/utils.service';

@Component({
  selector: 'app-waiting-room',
  standalone: true,
  imports: [PostContainerComponent, PopularHashtagComponent, SortingFormComponent],
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss', '../../../style/layout.scss']
})
export class WaitingRoomComponent extends BasePaginatedComponent implements OnInit {
  sortOptions: SortOption[] = [{
    text: 'Od najnowszych',
    sortBy: 'createdAt',
    order: 'desc'
  }, {
    text: 'Od najstarszych',
    sortBy: 'createdAt',
    order: 'asc'
  }, {
    text: 'Losowo',
    sortBy: 'random',
    order: 'asc'
  }]
  selectedSortOption: SortOption | null = null;

  response: PageResponse<Post> | null = null;

  constructor(
    private apiService: ApiService,
    private postContainerService: PostContainerService,
    protected override route: ActivatedRoute
  ) {
    super(route);
  }

  override loadPage(page: number) {
    var httpParams;
    if (this.selectedSortOption) {
      httpParams = new HttpParams()
        .append("sortBy", this.selectedSortOption.sortBy)
        .append("order", this.selectedSortOption.order);
    }

    console.log(page);
    this.apiService.get<PageResponse<Post>>(`/post/waiting/${page}`, { withCredentials: true, params: httpParams }).subscribe({
      next: (response) => {
        window.scrollTo({ top: 0 });

        this.response = response;
        this.postContainerService.load(response);
      },
    })
  }

  changeSortOption(sortOption: SortOption) {
    this.selectedSortOption = sortOption;
    this.loadPage(0);
  }

  getAmount(amount: number): string {
    return Utils.getPostAmountString(amount);
  }
}