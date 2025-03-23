import { Component, Input } from '@angular/core';
import { Hashtag } from '../../../../../../model/Hashtag';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

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

  constructor(
    private router: Router
  ) {

  }

  selectHashtag(hashtag: Hashtag, event: MouseEvent) {
    event?.stopPropagation();

    this.router.navigate(['/tag'], { queryParams: { v: hashtag.tag } });
  }

  toggleComponent(event: MouseEvent) {
    event?.stopPropagation();

    this.isShown = !this.isShown;
  }
}
