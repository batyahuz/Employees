import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { EmployeeAddComponent } from '../employee-add/employee-add.component';

@Component({
  selector: 'app-employee-main',
  templateUrl: './employee-main.component.html',
  styleUrl: './employee-main.component.css'
})
export class EmployeeMainComponent implements OnInit {
  employees: Employee[];

  getEmployees(): void {
    this._service.getEmployees({ status: true }).subscribe(e => this.employees = e)
  }

  openEditEmployeeDialog(employeeToEdit: Employee): void {
    this._router.navigate([`/employees/edit/${employeeToEdit.id}`])
  }

  addEmployee(): void {
    this._router.navigate(['/employees/add'])
  }

  deleteEmployee(id: number): void {
    this._service.deleteEmployeeById(id).then(() => this.getEmployees())
  }

  filterEmployees(value: Employee[]): void {
    this.employees = value;
  }

  constructor(private _service: EmployeeService, private _router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getEmployees()
  }
}
