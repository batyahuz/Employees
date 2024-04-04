import { Component, Input } from '@angular/core';
import { Employee, GENDER } from '../models/employee.model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-export-employee-to-excel',
  templateUrl: './export-employee-to-excel.component.html',
  styleUrl: './export-employee-to-excel.component.css'
})
export class ExportEmployeeToExcelComponent {
  @Input()
  employees: Employee[];

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

    const wb: XLSX.WorkBook = XLSX.utils.book_new()
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data)
    XLSX.utils.book_append_sheet(wb, ws, "Employees")
    XLSX.writeFile(wb, 'employees.xlsx')
  }
}
