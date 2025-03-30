import { AfterViewInit, Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ContentType, PostFlag } from '../../../../../../model/Post';
import { NgStyle } from '@angular/common';
import { ExpandableContent } from './ExpandableContent';
import { PostContentWarningComponent } from "./warning/warning.component";
import { PostContentEmbeddedXComponent } from "./embedded-x/embedded-x.component";
import { PostContentEmbeddedYTComponent } from "./embedded-yt/embedded-yt.component";

export interface PostContent {
  id: number;
  type: ContentType;
  content: string;
  flags: PostFlag[] | null;
}

@Component({
  selector: 'post-content',
  standalone: true,
  imports: [NgStyle, PostContentWarningComponent, PostContentEmbeddedXComponent, PostContentEmbeddedYTComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class PostContentComponent extends ExpandableContent {
  @Input({ required: true }) content!: PostContent | null;

  PostType = ContentType;

  constructor(
    private sanitizer: DomSanitizer
  ) {
    super();
  }

  getSafeUrl(content: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.tiktok.com/player/v1/${content}?&music_info=0&description=0&rel=0&native_context_menu=0&closed_caption=0`);
  }
}
