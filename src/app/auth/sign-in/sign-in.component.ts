import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthInputComponent, InputModel } from '../input/input.component';
import { ApiService } from '../../../service/api.service';
import { TokenResponse } from '../../../model/response/TokenResponse';
import { CookieService } from '../../../service/cookie.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthSubmitButtonComponent, ButtonStatus } from "../submit-button/submit-button.component";
import { PopupService } from '../../../service/popup.service';
import { AccountActivatedPopupComponent } from '../popup/account-activated/account-activated.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, AuthInputComponent, RouterLink, AuthSubmitButtonComponent],
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

  submitButtonStatus: ButtonStatus = ButtonStatus.ACTIVE;
  errorMessage: string = "";

  constructor(
    private apiService: ApiService,
    private popupService: PopupService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const uuid = this.route.snapshot.paramMap.get('uuid');
    if (uuid) {
      this.apiService.post<Response>("/auth/active/" + uuid, null, {}).subscribe({
        next: () => {
          this.popupService.showPopup(AccountActivatedPopupComponent, [], [{ name: 'backgroundClickClosePopup', value: false }]);
        }
      });
    }
  }

  onSubmit(): void {
    var isFormValid = true;
    if (!this.emailInput.component?.isValid()) {
      isFormValid = false;
    }
    if (!this.passwordInput.component?.isValid()) {
      isFormValid = false;
    }

    if (!isFormValid) {
      return;
    }

    this.errorMessage = "";
    this.submitButtonStatus = ButtonStatus.LOADING;

    this.apiService.post<TokenResponse>("/auth/signIn", {
      identifier: this.emailInput.value,
      password: this.passwordInput.value
    }, {}).subscribe({
      next: (response) => {
        CookieService.setCookie('jwt_token', response.token, 30);
        this.router.navigate(['/']);
      },
      error: (response) => {
        var responseError = response.error;

        if (responseError) {
          this.errorMessage = responseError.message;
        }

        this.submitButtonStatus = ButtonStatus.ACTIVE;
      }
    })
  }
}
