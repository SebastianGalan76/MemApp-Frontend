import { NgClass } from '@angular/common';
import { Component, ElementRef, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-aside-menu',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './aside-menu.component.html',
  styleUrl: './aside-menu.component.scss'
})
export class AsideMenuComponent implements OnDestroy {
  @ViewChild("scrollableContainer", { static: true }) containerRef!: ElementRef<HTMLDivElement>;
  scrollTimeout: any;

  isActive: boolean = false;

  constructor(
    private renderer: Renderer2
  ) { }

  toggleMenu(): void {
    this.isActive = !this.isActive;
  }

  onScroll(): void {
    const scrollable = this.containerRef.nativeElement;
    this.renderer.addClass(scrollable, 'scrolling');

    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.renderer.removeClass(scrollable, 'scrolling');
    }, 300);
  }

  ngOnDestroy(): void {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }
}
