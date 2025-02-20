import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AutoTextareaResizeDirective } from '../../../../directive/auto-textarea-resize.directive';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../../service/api.service';
import { ToastService } from '../../../../../service/toast.service';
import { Comment } from '../../../../../model/Comment';
import { ObjectResponse } from '../../../../../model/response/ObjectResponse';

@Component({
  selector: 'app-create-comment',
  standalone: true,
  imports: [AutoTextareaResizeDirective, NgClass, FormsModule],
  templateUrl: './create-comment.component.html',
  styleUrl: './create-comment.component.scss'
})
export class CreateCommentComponent implements AfterViewInit {
  @ViewChild('textarea') textarea!: ElementRef<HTMLTextAreaElement>;

  @Input({ required: true }) type!: string;
  @Input({ required: true }) id!: number;

  @Output() onSuccess: EventEmitter<Comment> = new EventEmitter();
  @Output() onCancel: EventEmitter<void> = new EventEmitter();

  isFooterShown: boolean = false;

  content: string = "";
  error: string = "";

  constructor(
    private apiService: ApiService,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    if (this.type == 'COMMENT') {
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
      type: this.type,
      id: this.id
    }, { withCredentials: true }).subscribe({
      next: (response) => {
        this.onSuccess.next(response.object);
        this.toastService.show(response.message);

        this.isFooterShown = false;
        this.content = "";
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
  }

  blur() {
    if (this.content.length == 0) {
      this.cancel();
    }
  }
}
