import { Component, EventEmitter, Input, OnInit, Output, input } from '@angular/core';
import { Employee } from '../models/employee.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  employeeForm: FormGroup;// = new FormGroup({});

  private _employee: Employee;
  public get employee(): Employee { return this._employee; }
  @Input()
  public set employee(value: Employee) {
    this._employee = value;
    // this.employeeForm = new FormGroup({
    //   id: new FormControl(this.employee.id),
    //   firstName: new FormControl(this.employee.firstName, [Validators.required]),
    //   lastName: new FormControl(this.employee.lastName, [Validators.required]),
    //   identityNumber: new FormControl(this.employee.identityNumber, [Validators.required, Validators.pattern("\\d{8,9}")]),
    //   gender: new FormControl(this.employee.gender, [Validators.required]),
    //   birthDate: new FormControl(this.employee.birthDate, [Validators.required]),
    //   startWorking: new FormControl(this.employee.startWorking, [Validators.required]),
    //   roles: this.formBuilder.array(this.employee.roles)
    // })
    if (this.employee) {
      this.employeeForm = this.formBuilder.group({
        id: [this.employee.id],
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
    const rolesArray: string[] = this.rolesArray.value.map((role: Role) => role.name);
    console.log('in availabe roels', rolesArray);
    console.log('this.rolesArray.value', this.rolesArray.value);

    return this.rolesNames?.filter(role => !rolesArray.includes(role.name));
  }

  createRoleFormGroup(role: Role): FormGroup {
    return this.formBuilder.group({
      // id: [role.id, Validators.required],
      name: this.formBuilder.group({
        // id: [role.name?.id],
        name: [role.name?.name]
      }),
      isManagerial: [role.isManagerial],
      startRole: [role.startRole]
    });
  }

  addRole() {
    console.log('in add role');
    // this.rolesArray.push(this.formBuilder.control(new Role()));
    this.rolesArray.push(this.createRoleFormGroup(new Role()));
  }

  removeRole(index: number) {
    this.rolesArray.removeAt(index);
  }

  submit() {
    console.log('submit!! value:', this.employeeForm.value);
    if (this.employeeForm.invalid) {
      return;
    }

    // this.onSubmit.emit(this.employee);
    // this.onSubmit.emit(this.employeeForm.value);
    console.log('this.employeeForm.value', this.employeeForm.value);

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
}
