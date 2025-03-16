import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Comment } from '../../../../../model/Comment';
import { CreateCommentComponent } from "../create-comment/create-comment.component";
import { DatePipe, NgClass } from '@angular/common';
import { ApiService } from '../../../../../service/api.service';
import { PageResponse } from '../../../../../model/response/PageResponse';
import { RatingSectionComponent } from "./rating-section/rating-section.component";
import { ContentComponent } from "./content/content.component";
import { UserAvatarComponent } from "../../../../shared/user/avatar/avatar.component";
import { MenuComponent } from "./menu/menu.component";
import { ToastService, ToastType } from '../../../../../service/toast.service';
import { Response } from '../../../../../model/response/Response';
import { CommentContainerComponent, CommentElement } from '../comment-container.component';
import { NickComponent } from "../../../../shared/user/nick/nick.component";
import { PopupService } from '../../../../../service/popup.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CreateCommentComponent, NgClass, DatePipe, RatingSectionComponent, ContentComponent, UserAvatarComponent, MenuComponent, NickComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent implements AfterViewInit {
  @ViewChild('repliesContainer', { read: ViewContainerRef, static: true }) repliesContainer!: ViewContainerRef;

  public comment!: Comment;
  public isReply: boolean = false;
  public parentComment: CommentComponent | null = null;

  isFormActive: boolean = false;
  isRepliesExpanded: boolean = true;

  comments: CommentElement[] = [];

  constructor(
    private parent: CommentContainerComponent,
    private apiService: ApiService,
    private popupService: PopupService,
    private toastService: ToastService
  ) { }

  ngAfterViewInit(): void {
    this.comment.reply.replies.forEach(reply => this.addCommentComponent(reply));
  }

  loadReplies() {
    this.apiService.get<PageResponse<Comment>>(`/comment/parent/${this.comment.id}/${this.comment.reply.currentPage}`, { withCredentials: true }).subscribe({
      next: (response) => {
        response.content.forEach(reply => this.comment.reply.replies.push(reply));
        response.content.forEach(reply => this.addCommentComponent(reply));

        this.comment.reply.currentPage++;
      }
    })
  }

  addCommentComponent(comment: Comment) {
    const componentRef = this.repliesContainer.createComponent(CommentComponent);
    componentRef.instance.comment = comment;
    componentRef.instance.isReply = true;
    componentRef.instance.parentComment = this;

    this.comments.push({
      id: comment.id,
      componentRef: componentRef
    })
  }

  addNewComment(comment: Comment) {
    this.isFormActive = false;

    if (this.comment.reply.totalReplies == this.comment.reply.replies.length) {
      this.comment.reply.totalReplies++;
      this.comment.reply.replies.push(comment);
      this.addCommentComponent(comment);
    }
    else {
      this.comment.reply.totalReplies++;
    }

  }

  reply() {
    this.isRepliesExpanded = true;
    this.isFormActive = true;
  }

  delete() {
    this.popupService.showConfirmPopup()
      .pipe(
        take(1)
      ).subscribe(response => {
        if (response.event == 'confirm') {
          if (!this.isReply) {
            this.parent.delete(this.comment.id);
          }
          else {
            if (this.parentComment) {
              this.parentComment.deleteReply(this.comment.id);
            }
          }
        }
      });
  }

  deleteReply(id: number) {
    this.apiService.delete<Response>(`/comment/${id}`, { withCredentials: true })
      .subscribe({
        next: (response) => {
          const index = this.comments.findIndex(comment => comment.id === id);

          if (index !== -1) {
            this.comments[index].componentRef.destroy();
            this.comments.splice(index, 1);
          }

          this.toastService.show(response.message);
        },
        error: (response) => {
          if (response.error) {
            this.toastService.show(response.error.message, ToastType.ERROR);
          }
        }
      })
  }
}
