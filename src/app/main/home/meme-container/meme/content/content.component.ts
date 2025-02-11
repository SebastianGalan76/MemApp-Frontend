import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export interface PostContent {
  type: ContentType;
  content: string;
}

export enum ContentType {
  IMAGE, TIKTOK, INSTAGRAM, X
}

@Component({
  selector: 'post-content',
  standalone: true,
  imports: [],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class PostContentComponent {
  @Input({ required: true }) content!: PostContent | null;

  ContentType = ContentType;

  constructor(private sanitizer: DomSanitizer) { }

  getSafeUrl(content: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.tiktok.com/player/v1/${content}?&music_info=0&description=0&rel=0&native_context_menu=0&closed_caption=0`);
  }
}
