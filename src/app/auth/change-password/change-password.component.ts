import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthInputComponent, InputModel } from '../input/input.component';
import { ApiService } from '../../../service/api.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [RouterLink, AuthInputComponent],
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

  isRuleAndPPAccepted: boolean = false;
  errorMessage: string = "";
  token: string | null = null;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.route.queryParamMap.subscribe(params => {
      this.token = params.get("token");
    })
  }

  onSubmit(): void {
    if (!this.passwordInput.component?.isValid()) {
      return;
    }
    if (!this.passwordConfirmInput.component?.isValid()) {
      return;
    }

    this.errorMessage = "";

    this.apiService.post<Response>("/auth/changePassword", {
      newPassword: this.passwordInput.value,
      token: this.token
    }, {}).subscribe({
      next: () => {

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
