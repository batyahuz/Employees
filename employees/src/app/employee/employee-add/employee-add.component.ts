import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.css',
  providers: [EmployeeService]
})
export class EmployeeAddComponent implements OnInit {
  employee: Employee;

  addEmployee(employeeToAdd: Employee) {
    this._service.addEmployee(employeeToAdd).then(() => {
      //swel success
      this._router.navigate(['/'])
    }).catch(() => {
      //swel error
    })
  }

  constructor(private _service: EmployeeService, private _router: Router) { }

  ngOnInit(): void {
    this.employee = new Employee()
  }
}
