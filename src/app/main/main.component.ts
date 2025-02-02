import { Component } from '@angular/core';
import { AsideMenuComponent } from "./aside-menu/aside-menu.component";
import { HeaderComponent } from "./header/header.component";
import { RouterOutlet } from '@angular/router';
import { User, UserService } from '../../service/user.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, AsideMenuComponent, HeaderComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  user: User | null = null;

  constructor(userService: UserService) {
    userService.getUser().subscribe({
      next: (user) => this.user = user
    })
  }
}
