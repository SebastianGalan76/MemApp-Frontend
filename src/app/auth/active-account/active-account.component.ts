import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthInputComponent, InputModel } from '../input/input.component';
import { ApiService } from '../../../service/api.service';

@Component({
  selector: 'app-active-account',
  standalone: true,
  imports: [RouterLink, AuthInputComponent],
  templateUrl: './active-account.component.html',
  styleUrls: ['../form-section.scss', '../form-elements.scss']
})
export class ActiveAccountComponent {
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

  errorMessage: string = "";

  constructor(
    private apiService: ApiService,
  ) { }

  onSubmit(): void {
    if (!this.emailInput.component?.isValid()) {
      return;
    }

    this.errorMessage = "";

    this.apiService.post<Response>("/auth/activeAccount?email=" + this.emailInput.value, null, {}).subscribe({
      next: (response) => {

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
