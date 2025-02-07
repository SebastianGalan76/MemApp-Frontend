import { NgClass } from '@angular/common';
import { Component, ElementRef, Injectable, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserMemeListAsideMenuElementComponent } from "./element/user-meme-list/user-meme-list.component";

@Component({
  selector: 'app-aside-menu',
  standalone: true,
  imports: [NgClass, RouterLink, UserMemeListAsideMenuElementComponent],
  templateUrl: './aside-menu.component.html',
  styleUrl: './aside-menu.component.scss'
})
export class AsideMenuComponent implements OnDestroy {
  @ViewChild("scrollableContainer", { static: true }) containerRef!: ElementRef<HTMLDivElement>;
  scrollTimeout: any;

  constructor(
    public service: AsideMenuService,
    private renderer: Renderer2
  ) { }

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

@Injectable({
  providedIn: "root"
})
export class AsideMenuService {
  isActive: boolean = false;

  toggleMenu(): void {
    this.isActive = !this.isActive;
  }
}