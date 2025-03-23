import { NgClass, NgFor, NgStyle } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MainComponent } from '../../../main.component';
import { ExpandableItem } from '../ExpandableItem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-collections-aside-menu',
  standalone: true,
  imports: [NgClass, NgStyle, NgFor],
  templateUrl: './user-collections.component.html',
  styleUrl: './user-collections.component.scss'
})
export class UserCollectionsAsideMenuElementComponent extends ExpandableItem {

  constructor(
    public parent: MainComponent,
    private router: Router,
    cdr: ChangeDetectorRef
  ) {
    super(1000, true, cdr);
  }

  selectList(uuid: string) {
    this.router.navigate(['collection', uuid]);
  }
}
