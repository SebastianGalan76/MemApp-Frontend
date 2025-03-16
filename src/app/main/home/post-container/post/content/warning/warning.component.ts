import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PostFlag } from '../../../../../../../model/Post';
import { ToastService, ToastType } from '../../../../../../../service/toast.service';
import { CookieService } from '../../../../../../../service/cookie.service';
import { UserService } from '../../../../../../../service/user.service';

@Component({
  selector: 'post-content-warning',
  standalone: true,
  imports: [NgClass],
  templateUrl: './warning.component.html',
  styleUrl: './warning.component.scss'
})
export class PostContentWarningComponent implements OnInit {
  @Input({ required: true }) flags!: PostFlag[] | null;
  @Input({ required: true }) id!: number;

  isShown: boolean = false;
  nsfw: boolean = false;

  constructor(
    private userService: UserService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    if (this.flags && this.flags.length > 0) {
      var index = this.flags.findIndex(flag => flag.type == 'NSFW');
      if (index >= 0) {
        this.nsfw = true;
      }

      if (!CookieService.getCookie('post-warning-' + this.id)) {
        this.isShown = true;
      }
    }
  }

  showContent(event: MouseEvent) {
    event.stopPropagation();

    this.userService.getUser().subscribe(user => {
      if (this.nsfw && !user) {
        this.toastService.show('Musisz się zalogować, aby zobaczyć zawartość', ToastType.ERROR);
      }
      else {
        this.isShown = false;
        CookieService.setCookie('post-warning-' + this.id, '1', 3600000);
      }
    })
  }

  getText(type: string): string {
    switch (type) {
      case 'SPOILER':
        return 'Spoiler';
      case 'NSFW':
        return 'NSFW';
      case 'RACIST':
        return 'Rasistowski';
    }

    return ''
  }
}
