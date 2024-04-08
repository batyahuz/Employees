import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { EmployeeAddComponent } from '../employee-add/employee-add.component';
import { filter } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-main',
  templateUrl: './employee-main.component.html',
  styleUrl: './employee-main.component.css'
})
export class EmployeeMainComponent implements OnInit {
  employees: Employee[];

  isAddRoute: boolean = false;
  isEditRoute: boolean = false;

  getEmployees(): void {
    this._service.getEmployees({ status: true }).subscribe(e => this.employees = e)
  }

  openEditEmployeeDialog(employeeToEdit: Employee): void {
    const dialogRef = this._dialog.open(EmployeeEditComponent, {
      width: '90%',
      data: { employee: employeeToEdit },
      maxHeight: '90vh',
      disableClose: true
    });
  }

  openAddEmployeeDialog(): void {
    this._dialog.open(EmployeeAddComponent, {
      width: '90%',
      maxHeight: '90vh',
      disableClose: true
    });
  }

  addEmployee(): void {
    this.openAddEmployeeDialog()
  }

  editEmployee(employeeToEdit: Employee): void {
    this.openEditEmployeeDialog(employeeToEdit)
  }

  deleteEmployee(id: number): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this._service.deleteEmployeeById(id).then(() => this.getEmployees())
        Swal.fire({
          position: "bottom-end",
          title: "Deleted!",
          text: "Employee has been deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 1000
        });
      }
    });
  }

  filterEmployees(value: Employee[]): void {
    this.employees = value;
  }

  constructor(private _service: EmployeeService, private _router: Router, private _dialog: MatDialog) { }

  ngOnInit(): void {
    this.getEmployees()

    // this._router.events
    //   .pipe(filter(event => event instanceof NavigationEnd))
    //   .subscribe((event) => {
    //     if (typeof (event) == typeof (NavigationEnd)) {
    //       if ((event as NavigationEnd).url.includes('/add')) {
    //         console.log('open edit');
    //         this.openAddEmployeeDialog();
    //       }
    //       else if ((event as NavigationEnd).url.includes('/edit')) {
    //         console.log('open edit');
    //         this.openEditEmployeeDialog();
    //       }
    //     }
    //   });
  }
}
