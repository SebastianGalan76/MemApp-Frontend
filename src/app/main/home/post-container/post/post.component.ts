import { Component, Input, OnInit } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { PopupService } from '../../../../../service/popup.service';
import { SaveMemePopupComponent } from './popup/save-popup/save-popup.component';
import { RatingSectionComponent } from "./rating-section/rating-section.component";
import { PostContent, PostContentComponent } from "./content/content.component";
import { Post } from '../../../../../model/Post';
import { AppService } from '../../../../../service/app.service';
import { Utils } from '../../../../../service/utils.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { UserAvatarComponent } from "../../../../shared/user/avatar/avatar.component";
import { NickComponent } from "../../../../shared/user/nick/nick.component";
import { ApiService } from '../../../../../service/api.service';
import { Response } from '../../../../../model/response/Response';
import { ToastService, ToastType } from '../../../../../service/toast.service';

@Component({
  selector: 'post',
  standalone: true,
  imports: [MenuComponent, RatingSectionComponent, PostContentComponent, DatePipe, UserAvatarComponent, NickComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  @Input({ required: true }) post!: Post;

  content: PostContent | null = null;

  constructor(
    private popupService: PopupService,
    private apiService: ApiService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.post.type == "IMAGE") {
      var content = "";
      if (Utils.isValidUrl(this.post.content)) {
        content = this.post.content;
      }
      else {
        content = AppService.getBackendDomain() + this.post.content;
      }

      this.content = {
        type: this.post.type,
        content: content
      }
    }
    if (this.post.type == "TIKTOK") {
      this.content = {
        type: this.post.type,
        content: this.post.content
      }
    }
  }

  save(event: MouseEvent) {
    event.stopPropagation();
    this.popupService.showPopup(SaveMemePopupComponent, [
      { name: 'post', value: this.post }
    ]);
  }

  delete(event: MouseEvent) {
    event.stopPropagation();

    this.apiService.delete<Response>(`/post/${this.post.id}`, { withCredentials: true }).subscribe({
      next: (response) => {
        this.toastService.show(response.message, ToastType.SUCCESS);
      },
      error: (response) => {
        if (response.error) {
          this.toastService.show(response.error.message, ToastType.ERROR);
        }

      }
    })
  }

  select() {
    this.router.navigate(['post', this.post.id]);
  }
}
