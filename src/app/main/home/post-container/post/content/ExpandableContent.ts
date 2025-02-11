import { Directive, ElementRef, ViewChild } from "@angular/core";

@Directive()
export class ExpandableContent {
    @ViewChild('pictureContainer') pictureContainer!: ElementRef;

    isExpanded: boolean = false;
    isInitialized: boolean = false;

    containerHeight: number = 0;

    toggleExpandedItem() {
        this.isExpanded = !this.isExpanded;
    }

    calculateHeight() {
        this.containerHeight = this.pictureContainer.nativeElement.offsetHeight;
        this.isInitialized = true;
    }
}