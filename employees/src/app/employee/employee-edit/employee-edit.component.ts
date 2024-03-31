import { Component } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.css'
})
export class EmployeeEditComponent {
  employee: Employee;

  editEmployee(employeeToUpdate: Employee) {
    this._service.updateEmployeeById(employeeToUpdate).then(() => {
      //swel success
      this._router.navigate(['/'])
    }).catch(() => {
      //swel error
    })
  }

  constructor(private _service: EmployeeService, private _router: Router, private _activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    const { id } = this._activatedroute.snapshot.params;
    this._service.getEmployeeById(id, true).subscribe({
      next: (data) => this.employee = data
    })
  }
}
