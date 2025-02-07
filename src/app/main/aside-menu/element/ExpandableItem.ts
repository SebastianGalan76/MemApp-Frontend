import { ChangeDetectorRef, Directive, ElementRef, ViewChild } from "@angular/core";

@Directive()
export class ExpandableItem {
    @ViewChild('container') container!: ElementRef;
    expandableItemId: number;
    isExpanded: boolean;

    isInitialized: boolean = false;
    containerHeight: number = 0;

    constructor(
        itemId: number,
        isExpanded: boolean,
        private cdr: ChangeDetectorRef
    ) {
        this.expandableItemId = itemId;
        this.isExpanded = isExpanded;
    }

    ngAfterViewInit() {
        this.updateContainerHeight();

        setTimeout(() => {
            this.isInitialized = true;

            const expandableItemStatus = localStorage.getItem("expandableItem-" + this.expandableItemId);
            if (!expandableItemStatus) {
                this.isExpanded = this.isExpanded;
            }
            else if (expandableItemStatus == "1") {
                this.isExpanded = true;
            } else {
                this.isExpanded = false;
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