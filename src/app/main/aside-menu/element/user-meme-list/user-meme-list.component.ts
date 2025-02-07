import { NgClass, NgFor, NgStyle } from '@angular/common';
import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MainComponent } from '../../../main.component';

@Component({
  selector: 'app-user-meme-list-aside-menu',
  standalone: true,
  imports: [NgClass, NgStyle, NgFor],
  templateUrl: './user-meme-list.component.html',
  styleUrl: './user-meme-list.component.scss'
})
export class UserMemeListAsideMenuElementComponent implements AfterViewInit, AfterViewChecked {
  @ViewChild('container') container!: ElementRef;
  expandableItemId: number = 1000;
  isInitialized: boolean = false;

  containerHeight: number = 0;
  isExpanded: boolean = false;

  constructor(
    public parent: MainComponent,
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    this.updateContainerHeight();
    setTimeout(() => {
      this.isInitialized = true;

      if (localStorage.getItem("expandableItem-" + this.expandableItemId) == "1") {
        this.isExpanded = true;
      }
    });
  }

  ngAfterViewChecked() {
    this.updateContainerHeight();
  }

  toggleExpandedItem() {
    this.isExpanded = !this.isExpanded;

    localStorage.setItem("expandableItem-" + this.expandableItemId, this.isExpanded ? "1" : "0");
  }

  private updateContainerHeight() {
    if (this.container) {
      this.containerHeight = this.container.nativeElement.scrollHeight;
      this.cdr.detectChanges();
    }
  }
}
