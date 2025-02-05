import { NgClass } from '@angular/common';
import { Component, ElementRef, OnDestroy, Renderer2 } from '@angular/core';

@Component({
  selector: 'meme-dropdown-menu',
  standalone: true,
  imports: [NgClass],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnDestroy {
  isActive: boolean = false;

  xPos: number = 0;
  yPos: number = 0;

  private clickListener: (() => void) | null = null;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  toggleMenu(event: MouseEvent): void {
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
