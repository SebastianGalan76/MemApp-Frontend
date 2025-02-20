import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Comment } from '../../../../../model/Comment';
import { CreateCommentComponent } from "../create-comment/create-comment.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CreateCommentComponent, NgClass],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent implements OnInit {
  @ViewChild('repliesContainer', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;

  public comment!: Comment;
  public isReply: boolean = false;

  isFormActive: boolean = false;
  isRepliesExpanded: boolean = true;

  ngOnInit(): void {
    if (this.comment.replies) {
      this.comment.replies.forEach(r => this.addCommentComponent(r));
    }
  }

  addCommentComponent(comment: Comment) {
    const componentRef = this.container.createComponent(CommentComponent);
    componentRef.instance.comment = comment;
    componentRef.instance.isReply = true;
  }

  addNewComment(comment: Comment) {
    this.isFormActive = false;

    if (!this.comment.replies) {
      this.comment.replies = [];
    }

    this.comment.replies.push(comment);
    this.addCommentComponent(comment);
  }

  reply() {
    this.isFormActive = true;
  }
}
