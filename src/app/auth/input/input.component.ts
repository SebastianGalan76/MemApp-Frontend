import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

export class InputModel {
  label!: string;
  type: string = "text";
  maxLength!: number;
  icon!: string;

  value: string = "";
  error: string = "";

  validateFunction?: (value: string) => string;
  component!: AuthInputComponent;
}

@Component({
  selector: 'auth-input',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './input.component.html',
  styleUrl: '../form-elements.scss'
})
export class AuthInputComponent implements OnInit {
  @Input({ required: true }) model!: Partial<InputModel>;

  ngOnInit(): void {
    this.model.value = "";
    this.model.error = "";
    this.model.component = this;
  }

  onChange() {
    this.validateInput();
  }

  onInput() {
    if (this.model.error!.length > 0) {
      this.validateInput();
    }
  }

  public validateInput() {
    if (this.model.validateFunction) {
      this.model.error = this.model.validateFunction(this.model.value!);
    }
  }
}
