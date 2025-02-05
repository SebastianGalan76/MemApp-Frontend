import { Component } from '@angular/core';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-meme',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './meme.component.html',
  styleUrl: './meme.component.scss'
})
export class MemeComponent {



}
