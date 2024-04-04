import { Component, OnInit } from '@angular/core';
import { Employee, GENDER } from '../models/employee.model';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { EmployeeAddComponent } from '../employee-add/employee-add.component';

@Component({
  selector: 'app-emplyees-table',
  templateUrl: './emplyees-table.component.html',
  styleUrl: './emplyees-table.component.css'
})
export class EmplyeesTableComponent implements OnInit {
  employees: Employee[];

  getEmployees(): void {
    this._service.getEmployees(true).subscribe(e => this.employees = e)
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

  exportToExcel(): void {
    const data: any[][] = [
      ["ID", "First Name", "Last Name", "Identity Number", "Gender", "Birth Date", "Start Working", "Roles"],
      ...this.employees.map(employee => [
        employee.id,
        employee.firstName,
        employee.lastName,
        employee.identityNumber,
        employee.gender === GENDER.male ? 'Male' : 'Female',
        employee.birthDate,
        employee.startWorking,
        employee.roles.map(role => role.name.name).join(', ')
      ])
    ];

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Employees");
    XLSX.writeFile(wb, 'employees.xlsx');
  }

  search(value: string) {
    
  }

  constructor(private _service: EmployeeService, private _router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getEmployees()
  }
}
