import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthInputComponent, InputModel } from '../input/input.component';
import { ApiService } from '../../../service/api.service';
import { TokenResponse } from '../../../model/response/TokenResponse';
import { CookieService } from '../../../service/cookie.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, AuthInputComponent, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrls: ['../form-section.scss', '../form-elements.scss']
})
export class SignInComponent {
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

      return "";
    }
  };

  errorMessage: string = "";

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    const uuid = this.route.snapshot.paramMap.get('uuid');
    if (uuid) {
      this.apiService.post<Response>("/auth/active/" + uuid, null, {});
    }
  }

  onSubmit(): void {
    if (!this.emailInput.component?.isValid()) {
      return;
    }
    if (!this.passwordInput.component?.isValid()) {
      return;
    }

    this.errorMessage = "";

    this.apiService.post<TokenResponse>("/auth/signIn", {
      identifier: this.emailInput.value,
      password: this.passwordInput.value
    }, {}).subscribe({
      next: (response) => {
        CookieService.setCookie('jwt_token', response.token, 30);

      },
      error: (response) => {
        var responseError = response.error;

        if (responseError) {
          this.errorMessage = responseError.message;
        }
      }
    })
  }
}
