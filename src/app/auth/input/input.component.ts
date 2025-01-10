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
  isPasswordInput: boolean = false;

  ngOnInit(): void {
    this.model.value = "";
    this.model.error = "";
    this.model.component = this;
    this.isPasswordInput = this.model.type == "password";
  }

  onChange() {
    this.model.error = this.validateInput();
  }

  onInput() {
    if (this.model.error!.length > 0) {
      this.model.error = this.validateInput();
    }
  }

  switchPasswordVisibility() {
    if (this.model.type == "password") {
      this.model.type = "text";
    }
    else {
      this.model.type = "password";
    }
  }

  public validateInput(): string {
    if (this.model.validateFunction) {
      return this.model.validateFunction(this.model.value!);
    }
    return "";
  }

  public isValid(): boolean {
    this.model.error = this.validateInput();
    return this.model.error.length > 0 ? false : true
  }
}
