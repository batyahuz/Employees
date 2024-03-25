import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { Employee } from '../models/employee.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('400ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('400ms ease-in', style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})
export class EmployeeFormComponent {

  @Output()
  onSubmit: EventEmitter<Employee> = new EventEmitter();

  employeeFrom: FormGroup;

  private _employee: Employee;
  public get employee(): Employee { return this._employee; }
  @Input()
  public set employee(value: Employee) {
    this._employee = value;
    this.employeeFrom = new FormGroup({
      id: new FormControl(this.employee.id),
      firstName: new FormControl(this.employee.firstName, [Validators.required]),
      surname: new FormControl(this.employee.surname, [Validators.required]),
      identityNumber: new FormControl(this.employee.identityNumber, [Validators.required, Validators.minLength(8), Validators.maxLength(9)]),
      gender: new FormControl(this.employee.gender, [Validators.required]),
      birthDate: new FormControl(this.employee.birthDate, [Validators.required]),
      status: new FormControl(this.employee.status, [Validators.required]),
      startWorking: new FormControl(this.employee.startWorking, [Validators.required]),
      roles: this.formBuilder.array(this.employee.roles)
    })
  }

  submit() {
    this.onSubmit.emit(this.employee);
  }

  constructor(private formBuilder: FormBuilder) { }
}
