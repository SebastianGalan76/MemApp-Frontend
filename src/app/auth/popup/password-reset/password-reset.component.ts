import { AfterViewInit, Component } from '@angular/core';
import { PopupComponent } from '../../../shared/popup-container/popup/popup.component';
import { Router } from '@angular/router';
import { LottieComponent } from 'ngx-lottie';
import { NgClass } from '@angular/common';

@Component({
  selector: 'auth-password-reset',
  standalone: true,
  imports: [LottieComponent, NgClass],
  templateUrl: './password-reset.component.html',
  styleUrl: '../popup.component.scss'
})
export class PasswordResetPopupComponent implements AfterViewInit {
  constructor(
    private parent: PopupComponent,
    private router: Router,
  ) { }

  isShow: boolean = false;
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.isShow = true;
    }, 1500)
  }

  close() {
    this.router.navigate(['/auth/signIn']);
    this.parent.close();
  }
}