import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthInputComponent, InputModel } from '../input/input.component';
import { ApiService } from '../../../service/api.service';
import { AuthSubmitButtonComponent, ButtonStatus } from '../submit-button/submit-button.component';
import { PopupService } from '../../../service/popup.service';
import { PasswordChangedPopupComponent } from '../popup/password-changed/password-changed.component';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [RouterLink, AuthInputComponent, AuthSubmitButtonComponent],
  templateUrl: './change-password.component.html',
  styleUrls: ['../form-section.scss', '../form-elements.scss']
})
export class ChangePasswordComponent {
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

  errorMessage: string = "";
  token: string | null = null;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private popupService: PopupService
  ) {
    this.route.queryParamMap.subscribe(params => {
      this.token = params.get("token");
    })
  }

  onSubmit(): void {
    var isFormValid = true;
    if (!this.passwordInput.component?.isValid()) {
      isFormValid = false;
    }
    if (!this.passwordConfirmInput.component?.isValid()) {
      isFormValid = false;
    }

    if (!isFormValid) {
      return;
    }

    this.errorMessage = "";
    this.submitButtonStatus = ButtonStatus.LOADING;

    this.apiService.post<Response>("/auth/changePassword", {
      newPassword: this.passwordInput.value,
      token: this.token
    }, {}).subscribe({
      next: () => {
        this.popupService.showPopup(PasswordChangedPopupComponent, [], [{ name: 'backgroundClickClosePopup', value: false }]);
        this.clearForm();
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

  clearForm() {
    this.passwordInput.value = "";
    this.passwordConfirmInput.value = "";

    this.submitButtonStatus = ButtonStatus.ACTIVE;
  }
}
