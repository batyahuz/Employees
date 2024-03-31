import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css'
})
export class InputFieldComponent {
  @Input() label: string;
  @Input() typeString: string;
  @Input() placeholder: string;
  @Input() form: FormGroup;
  @Input() controlName: string;
  @Input() validationErrors: {
    'pattern'?: string,
    'required'?: string
  };
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  get control(): FormControl {
    return this.form.controls[this.controlName] as FormControl;
  }

  onValueChange(event: any) {
    const value = event.target.value;
    this.control.setValue(value);
    this.valueChange.emit(value);
  }
}