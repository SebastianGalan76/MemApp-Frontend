import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PostFlag } from '../../../../../../../model/Post';
import { ToastService, ToastType } from '../../../../../../../service/toast.service';

@Component({
  selector: 'post-content-warning',
  standalone: true,
  imports: [NgClass],
  templateUrl: './warning.component.html',
  styleUrl: './warning.component.scss'
})
export class PostContentWarningComponent implements OnInit {
  @Input({ required: true }) flags!: PostFlag[] | null;

  isShown: boolean = false;

  nsfw: boolean = false;

  constructor(
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    if (this.flags) {
      const index = this.flags.findIndex(flag => flag.type == 'SPOILER');
      if (index >= 0) {
        this.isShown = true;
      }
    }
  }

  showContent(event: MouseEvent) {
    event.stopPropagation();

    if (this.nsfw) {
      this.toastService.show('Musisz się zalogować, aby zobaczyć zawartość', ToastType.ERROR);
    }
    else {
      this.isShown = false;
    }
  }


}
