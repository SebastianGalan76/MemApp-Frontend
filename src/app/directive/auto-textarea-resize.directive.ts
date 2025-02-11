import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[autoTextareaResize]',
  standalone: true
})
export class AutoTextareaResizeDirective {

  constructor(private element: ElementRef) {

  }

  @HostListener('input') onInput(): void {
    this.resize();
  }

  private resize(): void {
    const textArea = this.element.nativeElement as HTMLTextAreaElement;
    textArea.style.height = (textArea.scrollHeight + 4) + 'px';
  }
}
