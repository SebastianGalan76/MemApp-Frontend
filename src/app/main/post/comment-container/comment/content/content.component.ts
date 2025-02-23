import { NgClass } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'comment-content',
  standalone: true,
  imports: [NgClass],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent implements AfterViewInit {
  @ViewChild('contentElement') contentElement!: ElementRef;

  @Input({ required: true }) content!: string;

  isExpanded: boolean = false;
  isExpandable: boolean = false;

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    const height = this.contentElement.nativeElement.scrollHeight;
    if (height > 90) {
      this.isExpandable = true;
    }
    this.cdr.detectChanges();
  }

  expand() {
    this.isExpanded = true;
  }
}
