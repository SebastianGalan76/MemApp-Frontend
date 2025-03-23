import { NgClass } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { PostComponent } from '../post.component';
import { UserService } from '../../../../../../service/user.service';
import { PermissionChecker } from '../../../../../../util/PermissionChecker';
import { User } from '../../../../../../model/User';

@Component({
  selector: 'meme-dropdown-menu',
  standalone: true,
  imports: [NgClass],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnDestroy, OnInit {
  isActive: boolean = false;

  xPos: number = 0;
  yPos: number = 0;

  user: User | null = null;

  private clickListener: (() => void) | null = null;

  constructor(
    public parent: PostComponent,
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

  hasPermission(action: string): boolean {
    if (action == 'DELETE') {
      if (this.user && (PermissionChecker.hasPermission(this.user.role, 1000) || (this.parent.post.author && this.parent.post.author.id == this.user.id))) {
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
