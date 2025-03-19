import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../service/api.service';
import { ObjectResponse } from '../../../../model/response/ObjectResponse';
import { Hashtag } from '../../../../model/Hashtag';
import { DatePipe } from '@angular/common';

export interface HashtagDto {
  hashtag: Hashtag;
  popularity: number;
}

export interface PopularHashtag {
  hashtags: HashtagDto[];
  refreshedAt: Date;
}

@Component({
  selector: 'app-popular-hashtag',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './popular-hashtag.component.html',
  styleUrl: './popular-hashtag.component.scss'
})
export class PopularHashtagComponent implements OnInit {
  response: PopularHashtag | null = null;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this.fetchPopularHashtags();
  }

  fetchPopularHashtags() {
    this.apiService.get<ObjectResponse<PopularHashtag>>('/hashtag/popular', {}).subscribe({
      next: (response) => {
        this.response = response.object;
        this.cdr.detectChanges();
      }
    })
  }

  getAmount(amount: number): string {
    if (amount == 1) {
      return "1 Post";
    }
    if (amount > 1 && amount < 5) {
      return amount + " Posty";
    }
    return amount + " Postów";
  }
}
