import { Component, Input } from '@angular/core';
import { Hashtag } from '../../../../../../model/Hashtag';
import { NgClass } from '@angular/common';

@Component({
  selector: 'post-hashtag-container',
  standalone: true,
  imports: [NgClass],
  templateUrl: './hashtag.component.html',
  styleUrl: './hashtag.component.scss'
})
export class HashtagComponent {
  @Input({ required: true }) hashtags!: Hashtag[];

  isShown: boolean = false;

  selectHashtag(hashtag: Hashtag, event: MouseEvent) {
    event?.stopPropagation();


  }

  toggleComponent(event: MouseEvent) {
    event?.stopPropagation();

    this.isShown = !this.isShown;
  }
}
