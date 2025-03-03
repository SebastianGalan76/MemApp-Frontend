import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'user-nick',
  standalone: true,
  imports: [],
  templateUrl: './nick.component.html',
  styleUrl: './nick.component.scss'
})
export class NickComponent {
  @Input() user: {
    login: string
    role: string
  } | null = null;

  constructor(private router: Router) { }

  select(event: MouseEvent) {
    event.stopPropagation();

    if (this.user) {
      this.router.navigate(['user', this.user.login]);
    }
  }
}
