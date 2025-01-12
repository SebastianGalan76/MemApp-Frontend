import { NgClass } from '@angular/common';
import { AfterViewInit, Component, Input } from '@angular/core';
import { LottieComponent } from 'ngx-lottie';
import { PopupService } from '../../../../service/popup.service';
import { Popup } from '../../../shared/popup-container/popup-container.component';
import { PopupComponent } from '../../../shared/popup-container/popup/popup.component';

@Component({
  selector: 'app-account-created',
  standalone: true,
  imports: [LottieComponent, NgClass],
  templateUrl: './account-created.component.html',
  styleUrl: './account-created.component.scss'
})
export class AccountCreatedComponent implements AfterViewInit {
  constructor(
    private parent: PopupComponent
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
