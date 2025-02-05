import { Component } from '@angular/core';
import { PopupComponent } from '../../../../../../shared/popup-container/popup/popup.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'meme-save-popup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './save-popup.component.html',
  styleUrl: './save-popup.component.scss'
})
export class SaveMemePopupComponent {
  isFormVisible: boolean = false;

  listName: string = '';
  accessibility: string = 'PUBLIC';

  formErrorMessage: string | null = null;

  constructor(
    private parent: PopupComponent
  ) { }

  createList() {
    if (this.listName.length == 0) {
      this.formErrorMessage = 'Wprowadź nazwę listy';
      return;
    }
    this.formErrorMessage = null;

    this.toggleForm();

  }

  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  close() {
    this.parent.close();
  }
}
