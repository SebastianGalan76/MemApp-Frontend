import { NgClass } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { LottieComponent } from 'ngx-lottie';
import { PopupComponent } from '../../../shared/popup-container/popup/popup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verifivation-email-sended',
  standalone: true,
  imports: [LottieComponent, NgClass],
  templateUrl: './verification-email-sended.component.html',
  styleUrl: '../popup.component.scss'
})
export class VerificationEmailSendedPopupComponent implements AfterViewInit {
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
