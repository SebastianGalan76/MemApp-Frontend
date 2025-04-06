import { Component, ElementRef, EventEmitter, HostListener, OnDestroy, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { PageResponse } from '../../../model/response/PageResponse';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';
import { PostContainerService } from '../../../service/post-container.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from '../../../service/page.service';

@Component({
  selector: 'app-page-container',
  standalone: true,
  imports: [NgClass],
  templateUrl: './page-container.component.html',
  styleUrl: './page-container.component.scss'
})
export class PageContainerComponent implements OnDestroy {
  @ViewChild('pageContainer', { read: ViewContainerRef }) pageContainer!: ViewContainerRef;
  @ViewChild('pageContainer', { read: ElementRef }) pageContainerRef!: ElementRef;

  @ViewChild('pageTemplate', { read: TemplateRef }) pageTemplate!: TemplateRef<any>;
  @ViewChild('dividerTemplate', { read: TemplateRef }) dividerTemplate!: TemplateRef<any>;

  pageResponse: PageResponse<any> | null = null;
  currentPage: number = 1;

  subscription: Subscription | null = null;
  length: number = 10;

  constructor(
    pageService: PageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.subscription = pageService.postContainer$.subscribe({
      next: (response) => {
        if (response) {
          this.initialize(response);
        }
      }
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    const containerWidth = this.pageContainerRef.nativeElement.parentElement.clientWidth - 50;
    const length = Math.floor(containerWidth / 46);

    if (this.length != length) {
      this.length = length;
      this.generatePages();
    }
  }

  changePage(pageNumber: number): void {
    if (this.currentPage != pageNumber) {
      this.currentPage = pageNumber;

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: pageNumber },
        queryParamsHandling: 'merge'
      })
    }
  }

  private initialize(pageResponse: PageResponse<any> | null) {
    this.pageResponse = pageResponse;
    this.currentPage = pageResponse!.number + 1;

    if (this.pageContainerRef?.nativeElement) {
      const containerWidth = this.pageContainerRef.nativeElement.parentElement.clientWidth - 50;
      this.length = Math.floor(containerWidth / 46);
    }

    this.generatePages();
  }

  private generatePages(): void {
    if (!this.pageContainer) {
      return;
    }

    this.pageContainer.clear();

    if (!this.pageResponse) {
      return;
    }

    const totalPages = this.pageResponse.totalPages;

    if (totalPages <= 1) {
      return;
    }

    if (totalPages < this.length) {
      for (var i = 0; i < totalPages; i++) {
        this.createPageElement(i);
      }
    } else {
      const map = this.generatePageMap(this.currentPage, this.length, totalPages);

      map.forEach(v => {
        if (v == "X") {
          this.createDividerElement();
        }
        else {
          this.createPageElement(parseInt(v) - 1);
        }
      })
    }
  }

  private generatePageMap(currentPage: number, amount: number, totalElements: number): string[] {
    amount = Math.min(amount, totalElements);

    var result: string[] = new Array(amount);

    var left = currentPage;
    var right = currentPage + 1;
    var index = 0;

    while (index < amount) {
      if (left >= 1) {
        result[index++] = left.toString();
        left--;
      }
      if (index < amount && right <= totalElements) {
        result[index++] = right.toString();
        right++;
      }
    }

    result.sort((a, b) => Number(a) - Number(b));

    result[0] = "1";
    result[amount - 1] = totalElements.toString();

    if (result[1] !== "2") {
      result[1] = "X";
    }
    if (result[amount - 2] !== (totalElements - 1).toString()) {
      result[amount - 2] = "X";
    }

    return result;
  }

  private createPageElement(pageNumber: number): void {
    pageNumber++;

    const context = {
      $implicit: pageNumber,
      isSelected: pageNumber === this.currentPage
    };

    this.pageContainer.createEmbeddedView(this.pageTemplate, context);
  }

  private createDividerElement(): void {
    this.pageContainer.createEmbeddedView(this.dividerTemplate);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}