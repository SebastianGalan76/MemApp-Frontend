import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MemeContainerComponent } from "./meme-container/meme-container.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MemeContainerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent { }

