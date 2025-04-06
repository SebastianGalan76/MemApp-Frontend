import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AppService } from '../../../../service/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'user-avatar',
  standalone: true,
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class UserAvatarComponent implements OnChanges {
  @Input() user: {
    id: number,
    login: string,
    avatar: string
  } | null = null;

  iconUrl: string = "";
  showImage: boolean = false;

  letter: string = "";
  color: string = "";

  constructor(private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.user) {
      if (this.isHexColor(this.user.avatar)) {
        this.hideImage();
        this.letter = this.user.login.substring(0, 1).toUpperCase();
        this.color = this.user.avatar;
      }
      else {
        this.setImageForUser(this.user.avatar);
      }
    }
    else {
      this.setAvatarForGuest();
    }
  }

  select(event: MouseEvent) {
    event.stopPropagation();

    if (this.user) {
      this.router.navigate(['user', this.user.login]);
    }
  }

  hideImage() {
    this.showImage = false;

    this.color = "#628ad9";
    this.letter = this.user?.login.substring(0, 1).toUpperCase() ?? 'A';
  }

  private setImageForUser(fileName: string) {
    this.iconUrl = AppService.getBackendDomain() + "/uploads/user/avatar/" + fileName;
    this.showImage = true;
  }

  private setAvatarForGuest() {
    this.iconUrl = AppService.getBackendDomain() + "/uploads/user/avatar/incognito.png";
    this.showImage = true;
  }

  private isHexColor(color: string): boolean {
    return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(color);
  }
}
