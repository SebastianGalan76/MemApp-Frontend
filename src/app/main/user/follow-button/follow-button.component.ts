import { Component, Input } from '@angular/core';
import { ApiService } from '../../../../service/api.service';
import { ToastService, ToastType } from '../../../../service/toast.service';
import { Response } from '../../../../model/response/Response';
import { NgClass } from '@angular/common';

@Component({
  selector: 'user-profile-follow-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './follow-button.component.html',
  styleUrl: './follow-button.component.scss'
})
export class FollowButtonComponent {
  @Input({ required: true }) userId!: number;
  @Input({ required: true }) following: boolean = false;

  constructor(
    private apiService: ApiService,
    private toastService: ToastService
  ) {

  }

  follow() {
    this.apiService.post<Response>('/follow/' + this.userId, null, { withCredentials: true }).subscribe({
      next: (response) => {
        this.toastService.show(response.message);
        this.following = !this.following;
      },
      error: (response) => {
        if (response.error) {
          this.toastService.show(response.error.message, ToastType.ERROR);
        }
      }
    })
  }
}
