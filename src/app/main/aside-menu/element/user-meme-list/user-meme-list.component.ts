import { NgClass, NgFor, NgStyle } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MainComponent } from '../../../main.component';
import { ExpandableItem } from '../ExpandableItem';

@Component({
  selector: 'app-user-meme-list-aside-menu',
  standalone: true,
  imports: [NgClass, NgStyle, NgFor],
  templateUrl: './user-meme-list.component.html',
  styleUrl: './user-meme-list.component.scss'
})
export class UserMemeListAsideMenuElementComponent extends ExpandableItem {

  constructor(
    public parent: MainComponent,
    cdr: ChangeDetectorRef
  ) {
    super(1000, true, cdr);
  }
}
