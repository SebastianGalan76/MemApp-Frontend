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

  @HostListener('change') onChange(): void {
    this.resize();
  }

  private resize(): void {
    const textArea = this.element.nativeElement as HTMLTextAreaElement;

    textArea.style.height = '34px';
    textArea.style.height = (textArea.scrollHeight + 2) + 'px';
  }

  public clear() {
    const textArea = this.element.nativeElement as HTMLTextAreaElement;

    textArea.style.height = '34px';
  }
}
