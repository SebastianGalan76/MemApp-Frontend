import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthInputComponent, InputModel } from "../input/input.component";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, RouterLink, AuthInputComponent],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss', '../form-elements.scss']
})
export class SignUpComponent {
  loginInput: Partial<InputModel> = {
    label: "Login",
    maxLength: 20,
    icon: "fa-solid fa-user",
    validateFunction: (value: string) => {
      if (value.length == 0) {
        return "Wprowadź swój login";
      }
      if (value.length < 4) {
        return "Login jest zbyt krótki";
      }

      const regex = /^[a-zA-Z0-9_-]+$/;
      if (!regex.test(value)) {
        return "Login zawiera niedozwolony znak. Akceptujemy litery, cyfry oraz znak - i _";
      }

      return ""
    }
  };

  emailInput: Partial<InputModel> = {
    label: "E-mail",
    maxLength: 60,
    icon: "fa-solid fa-envelope",
    type: "email",
    validateFunction: (value: string) => {
      if (value.length == 0) {
        return "Wprowadź swój adres e-mail";
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !emailRegex.test(value) ? "Wprowadź poprawny adres e-mail" : "";
    }
  };

  passwordInput: Partial<InputModel> = {
    label: "Hasło",
    maxLength: 255,
    icon: "fa-solid fa-lock",
    type: "password",
    validateFunction: (value: string) => {
      if (value.length == 0) {
        return "Wprowadź swoje hasło";
      }
      if (value.length < 4) {
        return "Hasło jest zbyt krótkie";
      }

      if (this.passwordConfirmInput.value) {
        this.passwordConfirmInput.component?.validateInput();
      }

      return "";
    }
  };

  passwordConfirmInput: Partial<InputModel> = {
    label: "Powtórz hasło",
    maxLength: 255,
    icon: "fa-solid fa-lock",
    type: "password",
    validateFunction: (value: string) => {
      if (value.length == 0) {
        return "Powtórz swoje hasło";
      }
      if (value != this.passwordInput.value) {
        return "Hasła nie są identyczne";
      }

      return "";
    }
  };
}
