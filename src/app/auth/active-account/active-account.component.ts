import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthInputComponent, InputModel } from '../input/input.component';
import { ApiService } from '../../../service/api.service';
import { AuthSubmitButtonComponent, ButtonStatus } from '../submit-button/submit-button.component';
import { VerificationEmailSendedPopupComponent } from '../popup/verification-email-sended/verification-email-sended.component';
import { PopupService } from '../../../service/popup.service';

@Component({
  selector: 'app-active-account',
  standalone: true,
  imports: [RouterLink, AuthInputComponent, AuthSubmitButtonComponent],
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

  submitButtonStatus: ButtonStatus = ButtonStatus.ACTIVE;
  errorMessage: string = "";

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private popupService: PopupService
  ) { }

  onSubmit(): void {
    if (!this.emailInput.component?.isValid()) {
      return;
    }

    this.errorMessage = "";
    this.submitButtonStatus = ButtonStatus.LOADING;

    this.apiService.post<Response>("/auth/activeAccount?email=" + this.emailInput.value, null, {}).subscribe({
      next: () => {
        this.popupService.showPopup(VerificationEmailSendedPopupComponent, [], [{ name: 'backgroundClickClosePopup', value: false }]);
        this.submitButtonStatus = ButtonStatus.ACTIVE;
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

  moveBack() {
    this.router.navigate(['../signIn'], { relativeTo: this.route });
  }
}
