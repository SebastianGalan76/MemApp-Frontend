import { Component, EventEmitter, OnDestroy, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { PageResponse } from '../../../model/response/PageResponse';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';
import { PostContainerService } from '../../../service/post-container.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-container',
  standalone: true,
  imports: [NgClass],
  templateUrl: './page-container.component.html',
  styleUrl: './page-container.component.scss'
})
export class PageContainerComponent implements OnDestroy {
  @ViewChild('pageContainer', { read: ViewContainerRef }) pageContainer!: ViewContainerRef;
  @ViewChild('pageTemplate', { read: TemplateRef }) pageTemplate!: TemplateRef<any>;
  @ViewChild('dividerTemplate', { read: TemplateRef }) dividerTemplate!: TemplateRef<any>;

  @Output() onChangePage = new EventEmitter<number>();

  pageResponse: PageResponse<any> | null = null;
  currentPage: number = 1;

  subscription: Subscription | null = null;

  constructor(
    postContainerService: PostContainerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.subscription = postContainerService.postContainer$.subscribe({
      next: (response) => {
        if (response) {
          this.initialize(response);
        }
      }
    })
  }

  initialize(pageResponse: PageResponse<any> | null) {
    this.pageResponse = pageResponse;
    this.currentPage = pageResponse!.number;

    this.generatePages();
  }

  generatePages(): void {
    if (!this.pageContainer) {
      return;
    }

    this.pageContainer.clear();

    if (!this.pageResponse) {
      return;
    }

    const totalPages = this.pageResponse.totalPages - 1;
    if (totalPages < 1) {
      return;
    }

    if (totalPages <= 5) {
      for (var i = 0; i <= totalPages; i++) {
        this.createPageElement(i);
      }
    } else {
      if (this.currentPage >= 5) {
        this.createPageElement(0);
        this.createDividerElement();
      }

      for (var i = this.currentPage - 4; i <= this.currentPage + 2; i++) {
        if (i >= 0 && i <= totalPages) {
          this.createPageElement(i);
        }
      }

      if (this.currentPage <= totalPages - 3) {
        this.createDividerElement();
        this.createPageElement(totalPages);
      }
    }
  }

  createPageElement(pageNumber: number): void {
    const context = {
      $implicit: pageNumber,
      isSelected: pageNumber === this.currentPage
    };

    this.pageContainer.createEmbeddedView(this.pageTemplate, context);
  }

  createDividerElement(): void {
    this.pageContainer.createEmbeddedView(this.dividerTemplate);
  }

  changePage(pageNumber: number): void {
    if (this.currentPage != pageNumber) {
      this.currentPage = pageNumber;
      this.generatePages();

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: pageNumber + 1 },
        queryParamsHandling: 'merge'
      })

      this.onChangePage.emit(this.currentPage);
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

