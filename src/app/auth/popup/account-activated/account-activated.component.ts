import { NgClass } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { LottieComponent } from 'ngx-lottie';
import { PopupComponent } from '../../../shared/popup-container/popup/popup.component';

@Component({
  selector: 'auth-account-activated',
  standalone: true,
  imports: [LottieComponent, NgClass],
  templateUrl: './account-activated.component.html',
  styleUrl: '../popup.component.scss'
})
export class AccountActivatedPopupComponent implements AfterViewInit {
  constructor(
    private parent: PopupComponent,
  ) { }

  isShow: boolean = false;
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.isShow = true;
    }, 1500)
  }

  close() {
    this.parent.close();
  }
}