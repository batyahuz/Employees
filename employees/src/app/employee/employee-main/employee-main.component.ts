import { Component, OnInit } from '@angular/core';
import { Employee, GENDER } from '../models/employee.model';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { EmployeeAddComponent } from '../employee-add/employee-add.component';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-employee-main',
  templateUrl: './employee-main.component.html',
  styleUrl: './employee-main.component.css'
})
export class EmployeeMainComponent implements OnInit {
  employees: Employee[];
  searchTerms = new Subject<string>();

  getEmployees(): void {
    this._service.getEmployees({ status: true }).subscribe(e => this.employees = e)
  }

  openEditEmployeeDialog(employeeToEdit: Employee): void {
    this._router.navigate([`/employees/edit/${employeeToEdit.id}`])
    // this._router.navigate([{ outlets: { modal: [`edit/${employeeToEdit.id}`] } }])//, { skipLocationChange: true });
    // this._router.navigate(['/employee/edit/' + emp.id])

    // const dialogRef = this.dialog.open(EmployeeEditComponent, {
    //   width: '400px',
    //   data: { ...employeeToEdit }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.getEmployees();
    //   }
    // });
  }

  addEmployee(): void {
    this._router.navigate(['/employees/add'])
    // this._router.navigate([{ outlets: { modal: ['add'] } }])//, { skipLocationChange: true });

    // const dialogRef = this.dialog.open(EmployeeAddComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });

    // let dialogRef = this.dialog.open(EmployeeAddComponent, {
    //   height: '400px',
    //   width: '600px',
    // });
  }

  deleteEmployee(id: number): void {
    this._service.deleteEmployeeById(id).then(() => this.getEmployees())
  }

  search(value: string) {
    this.searchTerms.next(value)
  }

  constructor(private _service: EmployeeService, private _router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getEmployees()

    this.searchTerms.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((res) => this._service.getEmployees({ query: res }))
    ).subscribe((res) => this.employees = res)
  }
}
