import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '../../models/role.model';
import { EmployeeService } from '../../employee.service';
import { RoleName } from '../../models/role.name.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit {

  @Output()
  onSubmit: EventEmitter<Employee> = new EventEmitter();

  @Input()
  submitMessage: string;

  employeeForm: FormGroup;

  rolesNames: RoleName[];

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

  isAvailableRoleName(id: number): boolean {
    for (let index = 0; index < this.rolesArray.value.length; index++) {
      if (this.rolesArray.value[index].nameId == id)
        return false
    }
    return true
  }

  createRoleFormGroup(role: Role): FormGroup {
    return this.formBuilder.group({
      id: [role.id || 0],
      nameId: [role.nameId, Validators.required],
      isManagerial: [role.isManagerial, Validators.required],
      startRole: [role.startRole, Validators.required]
    });
  }

  isFormValid(): boolean {
    return this.employeeForm.valid
  }

  addRole(): void {
    this.rolesArray.push(this.createRoleFormGroup(new Role()));
  }

  removeRole(index: number): void {
    this.rolesArray.removeAt(index);
  }

  submit(): void {
    if (this.employeeForm.invalid) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Some fields are required"
      });
      return;
    }

    if (this.rolesArray.value?.length === 0) {
      this.employeeForm.removeControl('roles')
    }

    this.onSubmit.emit(this.employeeForm.value);
  }

  constructor(private formBuilder: FormBuilder, private _service: EmployeeService) { }

  ngOnInit(): void {
    if (this.employee && this.rolesArray?.length == 0) {
      this.addRole()
    }

    this._service.getRolesNames().subscribe({
      next: (data) => this.rolesNames = data
    })
  }
}
