import { Component } from '@angular/core';
import { MemeContainerComponent } from "./meme-container/meme-container.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MemeContainerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
