import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../models/employee.model';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Role } from '../models/role.model';
import { EmployeeService } from '../employee.service';
import { RoleName } from '../models/role.name.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'//,
  // animations: [
  //   trigger('slideInOut', [
  //     transition(':enter', [
  //       style({ transform: 'translateY(-100%)' }),
  //       animate('400ms ease-in', style({ transform: 'translateY(0%)' }))
  //     ]),
  //     transition(':leave', [
  //       animate('400ms ease-in', style({ transform: 'translateY(-100%)' }))
  //     ])
  //   ])
  // ]
})
export class EmployeeFormComponent implements OnInit {

  @Output()
  onSubmit: EventEmitter<Employee> = new EventEmitter();

  @Input()
  submitMessage: string;

  employeeForm: FormGroup;

  private _employee: Employee;
  public get employee(): Employee { return this._employee; }
  @Input()
  public set employee(value: Employee) {
    this._employee = value;
    if (this.employee) {
      this.employeeForm = this.formBuilder.group({
        id: [this.employee.id || 0],
        firstName: [this.employee.firstName, [Validators.required]],
        lastName: [this.employee.lastName, [Validators.required]],
        identityNumber: [this.employee.identityNumber, [Validators.required, Validators.pattern("\\d{8,9}")]],
        gender: [this.employee.gender, [Validators.required]],
        birthDate: [this.employee.birthDate, [Validators.required]],
        startWorking: [this.employee.startWorking, [Validators.required]],
        roles: this.formBuilder.array(this.employee.roles.map(role => this.createRoleFormGroup(role))
        , { validators: this.requireAllFieldsOrNone1 }
        )
      });
    }
  }

  get rolesArray(): FormArray {
    return this.employeeForm.get('roles') as FormArray;
  }

  rolesNames: RoleName[];

  get availableRolesName(): RoleName[] {
    // const rolesArray: string[] = this.rolesArray.value.map((role: Role) => role.name);
    console.log('rolesArray', this.rolesArray.value, 'employeeForm', JSON.stringify(this.employeeForm.value));
    return this.rolesNames
    // return this.rolesNames?.filter(role => !rolesArray.includes(role.name));
  }

  createRoleFormGroup(role: Role): FormGroup {
    return this.formBuilder.group({
      id: [role.id || 0],
      nameId: [role.nameId, Validators.required],
      isManagerial: [role.isManagerial, Validators.required],
      startRole: [role.startRole, Validators.required]
    }
    // , { validators: this.requireAllFieldsOrNone }
    );
  }

  // validateRolesArray: השךן = (array: AbstractControl[]): ValidationErrors | null => {
  //   if (array.length === 0 || array.every(control => Object.values((control as any).value).every(val => val === ''))) {
  //     return null;
  //   }

  //   return { required: true };
  // };


  // validateRolesArray: ValidatorFn = (array: AbstractControl): ValidationErrors => {
  // };
  // (array: AbstractControl[]): ValidationErrors | null {
  //   // if (array.length === 0 || array.every(group => Object.values(group.value).every(val => val === ''))) {
  //   if (array.length === 0 || array.every(group => this.requireAllFieldsOrNone(group) === null)) {
  //     return null;
  //   }
  //   return { required: true };
  // }

  // validateRolesArray: ValidatorFn = (array: AbstractControl): ValidationErrors | null => {
  //   const rolesArray = array as FormArray;

  //   // בדיקת תקינות לכל אחד מהפרטים ב-FomrArray
  //   for (const control of rolesArray.controls) {
  //     if (control.invalid) {
  //       return { invalidRole: true };
  //     }
  //   }

  //   return null; // אם כל הפרטים ב-FomrArray תקינים
  // };
  requireAllFieldsOrNone1(group: AbstractControl): ValidationErrors | null {
    console.log('group1', group.value);
    console.log('object group', Object.values(group.value));
    const hasValues = Object.values(group.value).every(array => Object.values(array).every((val, i) => i === 0 || (val !== null && val !== '')))
    const allEmpty = Object.values(group.value).every(array => Object.values(array).every((val, i) => i === 0 || val === null || val === ''))
    // const hasValues = Object.values(group.value).every((val, i) => i === 0 || (val !== null && val !== ''))
    // const allEmpty = Object.values(group.value).every((val, i) => i === 0 || val === null || val === '')
    console.log('hasValues', hasValues, '\nallEmpty', allEmpty);
    const r =  hasValues || allEmpty ? null : { required: true };
    console.log('r',r);
    
    return r;
    // return hasValues || allEmpty ? null : { required: true };
  }
  requireAllFieldsOrNone(group: AbstractControl): ValidationErrors | null {
    console.log('group2', group.value);
    console.log('object group', Object.values(group.value));
    // const hasValues = Object.values(group.value).every(array => Object.values(array).every((val, i) => i === 0 || (val !== null && val !== '')))
    // const allEmpty = Object.values(group.value).every(array => Object.values(array).every((val, i) => i === 0 || val === null || val === ''))
    const hasValues = Object.values(group.value).every((val, i) => i === 0 || (val !== null && val !== ''))
    const allEmpty = Object.values(group.value).every((val, i) => i === 0 || val === null || val === '')
    console.log('hasValues', hasValues, '\nallEmpty', allEmpty);

    const r =  hasValues || allEmpty ? null : { required: true };
    console.log('r',r);
    
    return r;
  }

  addRole() {
    console.log('in add role');
    this.rolesArray.push(this.createRoleFormGroup(new Role()));
  }

  removeRole(index: number) {
    this.rolesArray.removeAt(index);
  }

  submit() {
    console.log('submit!! value:', this.employeeForm.value);
    if (this.employeeForm.invalid) {
      //swel all fields are required
      return;
    }

    console.log('this.employeeForm.value', this.employeeForm.value);
    this.onSubmit.emit(this.employeeForm.value);

  }

  constructor(private formBuilder: FormBuilder, private _service: EmployeeService) { }

  ngOnInit(): void {
    if (this.rolesArray.length == 0) {
      this.addRole()
    }

    this._service.getRolesNames().subscribe({
      next: (data) => this.rolesNames = data
    })
  }



  fff() {
    console.log('value', this.employeeForm.value, 'valid', this.employeeForm.valid);
    if (this.employeeForm.invalid) {
      const invalidFields = Object.keys(this.employeeForm.controls).filter(controlName => this.employeeForm.get(controlName).invalid);
      console.log('Invalid fields:', invalidFields);
    }

    for (const control of this.rolesArray.controls) {
      if (control.invalid) {
        console.log('Validation errors for role:', control.value);
        console.log(control.errors);
      }
    }
    console.log('is valid array?',this.rolesArray.valid);
    
  }
}
