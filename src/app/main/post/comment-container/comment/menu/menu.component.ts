import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { CommentComponent } from '../comment.component';
import { NgClass } from '@angular/common';
import { UserService } from '../../../../../../service/user.service';

@Component({
  selector: 'comment-menu',
  standalone: true,
  imports: [NgClass],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  @Input({ required: true }) authorId!: number;

  isActive: boolean = false;

  xPos: number = 0;
  yPos: number = 0;

  isAuthor: boolean = false;

  private clickListener: (() => void) | null = null;

  constructor(
    public parent: CommentComponent,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (user) => {
        if (user && user.id == this.authorId) {
          this.isAuthor = true;
        }
      }
    })
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
