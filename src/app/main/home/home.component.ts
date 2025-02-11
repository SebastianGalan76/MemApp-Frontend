import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostContainerComponent } from "./post-container/post-container.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, PostContainerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent { }

