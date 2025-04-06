import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { User } from '../../../../model/User';
import { UserService } from '../../../../service/user.service';
import { UserCollectionComponent } from '../collection.component';
import { PermissionChecker } from '../../../../util/PermissionChecker';
import { NgClass } from '@angular/common';
import { Accessibility } from '../../../../model/UserCollection';

@Component({
  selector: 'collection-dropdown-menu',
  standalone: true,
  imports: [NgClass],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class CollectionMenuComponent implements OnDestroy, OnInit {
  isActive: boolean = false;

  xPos: number = 0;
  yPos: number = 0;

  user: User | null = null;

  private clickListener: (() => void) | null = null;

  constructor(
    public parent: UserCollectionComponent,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (user) => {
        this.user = user;
      }
    });
  }

  toggleMenu(event: MouseEvent): void {
    event.stopPropagation();

    this.isActive = !this.isActive;

    if (this.isActive) {
      this.xPos = 36 - event.offsetX;
      this.yPos = event.offsetY;

      this.addClickListener();
    }
    else {
      this.removeClickListener();
    }
  }

  hasPermission(action: 'DELETE' | 'SHARE' | 'EDIT'): boolean {
    if (action == 'DELETE' || action == 'EDIT') {
      if (this.user && (PermissionChecker.hasPermission(this.user.role, 5000) || (this.parent.collection!.author && this.parent.collection!.author.id == this.user.id))) {
        return true;
      }
    }
    if (action == 'SHARE') {
      if (this.parent.collection!.accessibility != Accessibility.PRIVATE) {
        return true;
      }
    }
    return false;
  }

  private addClickListener(): void {
    if (!this.clickListener) {
      this.clickListener = this.renderer.listen('document', 'click', (event: MouseEvent) => {
        if (!this.elementRef.nativeElement.contains(event.target)) {
          this.isActive = false;
          this.removeClickListener();
        }
      })
    }
  }

  private removeClickListener(): void {
    if (this.clickListener) {
      this.clickListener();
      this.clickListener = null;
    }
  }

  ngOnDestroy(): void {
    this.removeClickListener();
  }
}
