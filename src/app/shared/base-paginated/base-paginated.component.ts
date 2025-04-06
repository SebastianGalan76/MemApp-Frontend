import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-base-paginated',
  standalone: true,
  imports: [],
  template: '',
  styles: ''
})
export abstract class BasePaginatedComponent implements OnInit {
  constructor(protected route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      var page = 'page' in params ? +params['page'] : 1;

      if (page <= 0) {
        page = 1;
      }

      this.loadPage(page - 1);
    });
  }

  protected abstract loadPage(pageIndex: number): void;
}
