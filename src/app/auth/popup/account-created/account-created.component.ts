import { NgClass } from '@angular/common';
import { AfterViewInit, Component, Input } from '@angular/core';
import { LottieComponent } from 'ngx-lottie';
import { PopupService } from '../../../../service/popup.service';
import { Popup } from '../../../shared/popup-container/popup-container.component';
import { PopupComponent } from '../../../shared/popup-container/popup/popup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-created',
  standalone: true,
  imports: [LottieComponent, NgClass],
  templateUrl: './account-created.component.html',
  styleUrl: '../popup.component.scss'
})
export class AccountCreatedPopupComponent implements AfterViewInit {
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
