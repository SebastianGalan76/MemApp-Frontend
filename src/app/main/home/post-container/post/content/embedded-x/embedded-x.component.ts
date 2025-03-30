import { AfterViewInit, Component, Input } from '@angular/core';
import { PostContent } from '../content.component';

@Component({
  selector: 'post-content-embedded-x',
  standalone: true,
  imports: [],
  templateUrl: './embedded-x.component.html',
  styleUrl: './embedded-x.component.scss'
})
export class PostContentEmbeddedXComponent implements AfterViewInit {
  @Input({ required: true }) content!: PostContent;

  isLoading: boolean = true;

  ngAfterViewInit(): void {
    const twttr = (window as any).twttr;
    if (twttr !== 'undefined') {
      twttr.widgets.load();
      twttr.events.bind('rendered', (event: any) => {
        this.onLoad();
      });
    }
  }

  onLoad() {
    //this.isLoading = false;
  }
}
