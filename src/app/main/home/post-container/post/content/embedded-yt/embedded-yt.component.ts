import { Component, Input } from '@angular/core';
import { PostContent } from '../content.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'post-content-embedded-yt',
  standalone: true,
  imports: [],
  templateUrl: './embedded-yt.component.html',
  styleUrl: './embedded-yt.component.scss'
})
export class PostContentEmbeddedYTComponent {
  @Input({ required: true }) content!: PostContent;
  isLoading: boolean = true;

  constructor(
    private sanitizer: DomSanitizer
  ) {

  }

  getSafeUrl(content: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${content}`);
  }
}
