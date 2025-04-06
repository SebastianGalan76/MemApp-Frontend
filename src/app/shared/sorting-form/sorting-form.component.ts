import { NgClass } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, Output, Renderer2 } from '@angular/core';

export interface SortOption {
  text: string;
  sortBy: string;
  order: string;
}

@Component({
  selector: 'app-sorting-form',
  standalone: true,
  imports: [NgClass],
  templateUrl: './sorting-form.component.html',
  styleUrl: './sorting-form.component.scss'
})
export class SortingFormComponent implements OnDestroy {
  @Input({ required: true }) options!: SortOption[];
  @Input({ required: true }) selectedOption!: SortOption;

  @Output() onChange = new EventEmitter<SortOption>();

  isActive: boolean = false;

  private clickListener: (() => void) | null = null;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) { }

  select(option: SortOption) {
    this.selectedOption = option;

    this.onChange.emit(option);
  }

  toggleMenu(): void {
    this.isActive = !this.isActive;

    if (this.isActive) {
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
