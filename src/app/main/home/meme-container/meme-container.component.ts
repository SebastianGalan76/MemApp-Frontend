import { Component } from '@angular/core';
import { MemeComponent } from "./meme/meme.component";

@Component({
  selector: 'app-meme-container',
  standalone: true,
  imports: [MemeComponent],
  templateUrl: './meme-container.component.html',
  styleUrl: './meme-container.component.scss'
})
export class MemeContainerComponent {

}
