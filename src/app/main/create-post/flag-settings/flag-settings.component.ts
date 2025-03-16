import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ExpandableItem } from '../../aside-menu/element/ExpandableItem';
import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FlagSettings {
  enum: string;
  name: string;
  icon: string;
  description: string;
  isSelected: boolean;
}

@Component({
  selector: 'create-post-flag-settings',
  standalone: true,
  imports: [NgClass, NgStyle, CommonModule, FormsModule],
  templateUrl: './flag-settings.component.html',
  styleUrl: './flag-settings.component.scss'
})
export class FlagSettingsComponent extends ExpandableItem implements OnInit {

  flags: FlagSettings[] = [];

  constructor(
    cdr: ChangeDetectorRef
  ) {
    super(9910, false, cdr);
  }

  ngOnInit(): void {
    this.initializeFlag();
  }

  toggleFlag(flag: FlagSettings) {
    flag.isSelected = !flag.isSelected;
  }

  getSelectedFlags(): string[] {
    var selectedFlags: string[] = [];

    this.flags.forEach(flag => {
      if (flag.isSelected) {
        selectedFlags.push(flag.enum);
      }
    })

    return selectedFlags;
  }

  private initializeFlag() {
    this.flags.push({
      enum: 'SPOILER',
      name: 'Spoiler',
      icon: 'fa-solid fa-triangle-exclamation',
      description: 'Może zepsuć niespodziankę widzowi',
      isSelected: false
    });

    this.flags.push({
      enum: 'NSFW',
      name: 'NSFW',
      icon: 'fa-solid fa-triangle-exclamation',
      description: 'Zawiera treści dla dorosłych',
      isSelected: false
    });

    this.flags.push({
      enum: 'RACIST',
      name: 'Rasistowski',
      icon: 'fa-solid fa-triangle-exclamation',
      description: 'Dotyczy rasizmu lub dyskryminacji rasowej',
      isSelected: false
    });
  }
}
