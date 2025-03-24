import { Component, Input } from '@angular/core';
import { Comment } from '../../../../../../../model/Comment';
import { FormsModule } from '@angular/forms';
import { PopupComponent } from '../../../../../../shared/popup-container/popup/popup.component';
import { ApiService } from '../../../../../../../service/api.service';
import { ToastService, ToastType } from '../../../../../../../service/toast.service';
import { Response } from '../../../../../../../model/response/Response';


interface ReasonElement {
  value: string,
  isSelected: boolean;
}

@Component({
  selector: 'app-report-popup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './report-popup.component.html',
  styleUrl: './report-popup.component.scss'
})
export class ReportCommentPopupComponent {
  @Input({ required: true }) comment!: Comment;

  premadeReasons: ReasonElement[] = [];
  ownReason: string = "";

  constructor(
    private parent: PopupComponent,
    private apiService: ApiService,
    private toastService: ToastService
  ) {
    this.loadPremadeReasons();
  }

  sendReport() {
    var finalReason = "";

    this.premadeReasons.forEach(reason => {
      if (reason.isSelected) {
        finalReason += reason.value + ", ";
      }
    });

    finalReason += this.ownReason.trim();
    if (finalReason.length < 3) {
      this.toastService.show('Wybierz powód lub wprowadź własny powód zgłoszenia.', ToastType.ERROR);
      return;
    }

    this.apiService.post<Response>('/report', {
      reportedCommentId: this.comment.id,
      reason: finalReason
    }, { withCredentials: true }).subscribe({
      next: (response) => {
        this.toastService.show(response.message, ToastType.SUCCESS);
        this.close();
      },
      error: (response) => {
        if (response.error) {
          this.toastService.show(response.error.message, ToastType.ERROR);
        }
      }
    })
  }

  selectReason(element: ReasonElement) {
    element.isSelected = !element.isSelected;
  }

  close() {
    this.parent.close();
  }

  loadPremadeReasons() {
    this.premadeReasons.push(this.getReasonElement('Spam'));
    this.premadeReasons.push(this.getReasonElement('Spoiler'));
    this.premadeReasons.push(this.getReasonElement('NSFW'));
    this.premadeReasons.push(this.getReasonElement('Rasistowski'));
    this.premadeReasons.push(this.getReasonElement('Reklama'));
    this.premadeReasons.push(this.getReasonElement('Nieodpowiedni język'));
    this.premadeReasons.push(this.getReasonElement('Zawiera dane osobowe'));
    this.premadeReasons.push(this.getReasonElement('Mowa nienawiści'));
    this.premadeReasons.push(this.getReasonElement('+18'));
    this.premadeReasons.push(this.getReasonElement('Hejt'));
    this.premadeReasons.push(this.getReasonElement('Dezinformacja'));
    this.premadeReasons.push(this.getReasonElement('Przemoc'));
    this.premadeReasons.push(this.getReasonElement('Nękanie'));
    this.premadeReasons.push(this.getReasonElement('Treści nielegalne'));
  }

  getReasonElement(value: string) {
    return {
      value: value,
      isSelected: false,
    }
  }
}

