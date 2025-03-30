import { Component, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { PopupService } from '../../../../../service/popup.service';
import { SavePostPopupComponent } from './popup/save-popup/save-popup.component';
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
import { PostContainerComponent } from '../post-container.component';
import { take } from 'rxjs';
import { HashtagComponent } from "./hashtag/hashtag.component";
import { ReportPostPopupComponent } from './popup/report-popup/report-popup.component';

@Component({
  selector: 'post',
  standalone: true,
  imports: [MenuComponent, RatingSectionComponent, PostContentComponent, DatePipe, UserAvatarComponent, NickComponent, HashtagComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  @Input({ required: true }) post!: Post;

  @ViewChild('hashtagContainer') hashtagContainer: HashtagComponent | null = null;

  content: PostContent | null = null;

  constructor(
    @Optional() private parent: PostContainerComponent | null,
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
        id: this.post.id,
        type: this.post.type,
        content: content,
        flags: this.post.flags
      }
    }
    else if (this.post.type == "TIKTOK") {
      this.content = {
        id: this.post.id,
        type: this.post.type,
        content: this.post.content,
        flags: this.post.flags
      }
    }
    else if (this.post.type == "X") {
      this.content = {
        id: this.post.id,
        type: this.post.type,
        content: this.post.content,
        flags: this.post.flags
      }
    }
  }

  save(event: MouseEvent) {
    event.stopPropagation();
    this.popupService.showPopup(SavePostPopupComponent, [
      { name: 'post', value: this.post }
    ]);
  }

  delete(event: MouseEvent) {
    event.stopPropagation();

    this.popupService.showConfirmPopup()
      .pipe(
        take(1)
      ).subscribe(response => {
        if (response.event == 'confirm') {
          this.apiService.delete<Response>(`/post/${this.post.id}`, { withCredentials: true }).subscribe({
            next: (response) => {
              if (this.parent) {
                this.parent.deletePost(this.post.id);
              }
              else {
                this.router.navigate(['/']);
              }
              this.toastService.show(response.message, ToastType.SUCCESS);
            },
            error: (response) => {
              if (response.error) {
                this.toastService.show(response.error.message, ToastType.ERROR);
              }

            }
          })
        }
      });
  }

  report(event: MouseEvent) {
    event.stopPropagation();

    this.popupService.showPopup(ReportPostPopupComponent, [
      { name: 'post', value: this.post }
    ]);
  }

  copyLink(event: MouseEvent) {
    event.stopPropagation();

    const link = 'https://xmem.pl/post/' + this.post.id;

    navigator.clipboard.writeText(link).then(() => {
      this.toastService.show('Skopiowano link do schowka');
    }).catch(err => {
      console.error('Błąd kopiowania: ', err);
    });
  }

  select() {
    this.router.navigate(['post', this.post.id]);
  }
}
