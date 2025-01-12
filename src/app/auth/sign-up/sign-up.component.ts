import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthInputComponent, InputModel } from "../input/input.component";
import { ApiService } from '../../../service/api.service';
import { Response } from '../../../model/response/Response';
import { PopupService } from '../../../service/popup.service';
import { AccountCreatedComponent } from '../popup/account-created/account-created.component';
import { AuthSubmitButtonComponent, ButtonStatus } from "../submit-button/submit-button.component";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, RouterLink, AuthInputComponent, AuthSubmitButtonComponent],
  templateUrl: './sign-up.component.html',
  styleUrls: ['../form-section.scss', '../form-elements.scss']
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

  submitButtonStatus: ButtonStatus = ButtonStatus.ACTIVE;

  isRuleAndPPAccepted: boolean = false;
  errorMessage: string = "";

  constructor(
    private apiService: ApiService,
    private popupService: PopupService
  ) { }

  onSubmit(): void {
    if (!this.loginInput.component?.isValid()) {
      return;
    }
    if (!this.emailInput.component?.isValid()) {
      return;
    }
    if (!this.passwordInput.component?.isValid()) {
      return;
    }
    if (!this.passwordConfirmInput.component?.isValid()) {
      return;
    }

    if (!this.isRuleAndPPAccepted) {
      this.errorMessage = "Musisz zaakceptować nasz regulamin oraz politykę prywatności."
      return;
    }

    this.errorMessage = "";

    this.submitButtonStatus = ButtonStatus.LOADING;
    this.apiService.post<Response>("/auth/signUp", {
      login: this.loginInput.value,
      email: this.emailInput.value,
      password: this.passwordInput.value
    }, {}).subscribe({
      next: () => {
        this.popupService.showPopup(AccountCreatedComponent, [], [{ name: 'backgroundClickClosePopup', value: false }]);
        this.clearForm();
      },
      error: (response) => {
        var responseError = response.error;

        if (responseError) {
          switch (responseError.errorCode) {
            case 1:
            case 2:
              this.loginInput.error = responseError.message
              return;
            case 3:
              this.passwordInput.error = responseError.message
              return;
            case 4:
              this.emailInput.error = responseError.message
              return;
          }

          this.errorMessage = responseError.message;
          this.submitButtonStatus = ButtonStatus.ACTIVE;
        }
      }
    })
  }

  clearForm() {
    this.loginInput.value = "";
    this.emailInput.value = "";
    this.passwordInput.value = "";
    this.passwordConfirmInput.value = "";

    this.isRuleAndPPAccepted = false;

    this.submitButtonStatus = ButtonStatus.ACTIVE;
  }
}
