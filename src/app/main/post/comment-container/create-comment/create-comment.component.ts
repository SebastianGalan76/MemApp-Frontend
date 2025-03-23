import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AutoTextareaResizeDirective } from '../../../../directive/auto-textarea-resize.directive';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../../service/api.service';
import { ToastService } from '../../../../../service/toast.service';
import { Comment } from '../../../../../model/Comment';
import { ObjectResponse } from '../../../../../model/response/ObjectResponse';
import { UserAvatarComponent } from "../../../../shared/user/avatar/avatar.component";
import { UserService } from '../../../../../service/user.service';
import { Observable } from 'rxjs';
import { User } from '../../../../../model/User';

@Component({
  selector: 'app-create-comment',
  standalone: true,
  imports: [AutoTextareaResizeDirective, NgClass, FormsModule, UserAvatarComponent, CommonModule],
  templateUrl: './create-comment.component.html',
  styleUrl: './create-comment.component.scss'
})
export class CreateCommentComponent implements AfterViewInit {
  @ViewChild('textarea') textarea!: ElementRef<HTMLTextAreaElement>;
  @ViewChild(AutoTextareaResizeDirective) autoTextarea!: AutoTextareaResizeDirective;

  @Input({ required: true }) id!: number;
  @Input() isReply: boolean = false;

  @Output() onSuccess: EventEmitter<Comment> = new EventEmitter();
  @Output() onCancel: EventEmitter<void> = new EventEmitter();

  user$: Observable<User | null>;

  isFooterShown: boolean = false;

  content: string = "";
  error: string = "";

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) {
    this.user$ = userService.getUser();
  }

  ngAfterViewInit(): void {
    if (this.isReply) {
      this.textarea.nativeElement.focus();
      this.cdr.detectChanges();
    }
  }

  comment() {
    if (this.content.length == 0) {
      return;
    }

    this.apiService.post<ObjectResponse<Comment>>('/comment', {
      content: this.content,
      type: this.isReply ? 'COMMENT' : 'POST',
      id: this.id
    }, { withCredentials: true }).subscribe({
      next: (response) => {
        this.onSuccess.next(response.object);
        this.toastService.show(response.message);

        this.isFooterShown = false;
        this.content = "";
        this.autoTextarea.clear();
      },
      error: (response) => {
        if (response.error) {
          this.error = response.error.message;
        }
      }
    })
  }

  cancel() {
    this.content = "";
    this.isFooterShown = false;

    this.error = "";
    this.onCancel.next();

    this.autoTextarea.clear();
  }

  blur() {
    if (this.content.length == 0) {
      this.cancel();
    }
  }
}
