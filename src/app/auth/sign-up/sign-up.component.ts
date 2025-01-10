import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss', '../form-elements.scss']
})
export class SignUpComponent {
  login: string = "";
  email: string = "";
  password: string = "";
  passwordConfirm: string = "";


}
