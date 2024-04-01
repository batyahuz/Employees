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
        roles: this.formBuilder.array(this.employee.roles.map(role => this.createRoleFormGroup(role)))
      });
    }
  }

  get rolesArray(): FormArray {
    return this.employeeForm.get('roles') as FormArray;
  }

  rolesNames: RoleName[];

  get availableRolesName(): RoleName[] {
    const availables = this.rolesNames?.filter(r => {
      for (let index = 0; index < this.rolesArray.value.length; index++) {
        if (this.rolesArray.value[index].nameId === r.id)
          return false
      }
      return true
    })
    // const rolesArray: string[] = this.rolesArray.value.map((role: Role) => role.name);
    // console.log('rolesArray', this.rolesArray.value, 'employeeForm', JSON.stringify(this.employeeForm.value));
    console.log('available', availables);

    return this.rolesNames
    // return this.rolesNames?.filter(role => !rolesArray.includes(role.name));
  }

  createRoleFormGroup(role: Role): FormGroup {
    return this.formBuilder.group({
      id: [role.id || 0],
      nameId: [role.nameId, Validators.required],
      isManagerial: [role.isManagerial, Validators.required],
      startRole: [role.startRole, Validators.required]
    });
  }

  isArrayHasValues(array: unknown[]): boolean {
    return Object.values(array).every((val, i) => i === 0 || (val !== null && val !== ''))
  }

  isArrayAllEmpty(array: unknown[]): boolean {
    return Object.values(array).every((val, i) => i === 0 || val === null || val === '')

  }

  requireAllFieldsOrNone(group: AbstractControl): boolean {
    return Object.values(group.value).every(array =>
      this.isArrayHasValues(Object.values(array)) || this.isArrayAllEmpty(Object.values(array)))
  }

  isFormValid(): boolean {
    //console.log('in is valid');

    if (this.employeeForm.invalid) {
      const invalidFields = Object.keys(this.employeeForm.controls).filter(controlName => this.employeeForm.get(controlName).invalid);
      //console.log('invalidFields', invalidFields);

      if (invalidFields.length > 1 || invalidFields[0] !== 'roles' || !this.requireAllFieldsOrNone(this.rolesArray)) {
        //console.log('return false');
        return false
      }
    }
    //console.log('return true');
    return true;
  }

  addRole() {
    //console.log('in add role');
    this.rolesArray.push(this.createRoleFormGroup(new Role()));
  }

  removeRole(index: number) {
    this.rolesArray.removeAt(index);
  }

  submit() {
    //console.log('submit!! value:', this.employeeForm.value);
    if (!this.isFormValid()) {
      //swel all fields are required
      return;
    }

    for (let index = this.rolesArray.length - 1; index >= 0; index--) {
      if (this.isArrayAllEmpty(this.employeeForm.value.roles[index]))
        this.employeeForm.value.roles.pop()
    }
    if (this.rolesArray.value?.length === 0) {
      //console.log('remove roles');

      this.employeeForm.removeControl('roles')
      //console.log('this.employeeForm.value with out roles', JSON.stringify(this.employeeForm.value));
    }

    //console.log('this.employeeForm.value', JSON.stringify(this.employeeForm.value));
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
    //console.log('value', this.employeeForm.value, 'valid', this.employeeForm.valid);
    if (this.employeeForm.invalid) {
      const invalidFields = Object.keys(this.employeeForm.controls).filter(controlName => this.employeeForm.get(controlName).invalid);
      //console.log('Invalid fields:', invalidFields);
    }

    for (const control of this.rolesArray.controls) {
      if (control.invalid) {
        //console.log('Validation value for role:', control.value);
        //console.log('Validation errors for role:', control.errors);
      }
    }
    //console.log('is valid array?', this.rolesArray.valid);

    //console.log('errors', this.employeeForm.errors);
    //console.log('validator', this.employeeForm.validator);



  }
}
