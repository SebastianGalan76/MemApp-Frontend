import { ChangeDetectorRef, Component } from '@angular/core';
import { ExpandableItem } from '../../aside-menu/element/ExpandableItem';
import { NgClass, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'create-post-hashtag-settings',
  standalone: true,
  imports: [NgClass, NgStyle, FormsModule],
  templateUrl: './hashtag-settings.component.html',
  styleUrl: './hashtag-settings.component.scss'
})
export class HashtagSettingsComponent extends ExpandableItem {
  hashtags: string[] = [];

  inputValue: string = "";

  constructor(
    cdr: ChangeDetectorRef
  ) {
    super(9911, false, cdr);
  }

  public getHashtags(): string[] {
    return this.hashtags;
  }

  createNewTag() {
    const newHashtag = this.inputValue.trim().toLowerCase();
    const index = this.hashtags.findIndex(tag => tag == newHashtag);

    if (index == -1) {
      this.hashtags.push(newHashtag);
      this.inputValue = "";
    }
  }

  removeHashtag(value: string) {
    const index = this.hashtags.findIndex(tag => tag == value);

    if (index != -1) {
      this.hashtags.splice(index, 1);
    }
  }
}
