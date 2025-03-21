import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MainComponent } from '../main.component';
import { AsideMenuService } from '../aside-menu/aside-menu.component';
import { NgClass } from '@angular/common';
import { UserAvatarComponent } from "../../shared/user/avatar/avatar.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgClass, UserAvatarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(
    public parent: MainComponent,
    public asideMenuService: AsideMenuService
  ) { }
}
