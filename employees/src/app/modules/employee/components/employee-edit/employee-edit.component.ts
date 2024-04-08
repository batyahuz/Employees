import { Component, Inject } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.css'
})
export class EmployeeEditComponent {
  employee: Employee;

  editEmployee(employeeToUpdate: Employee) {
    this._service.updateEmployeeById(employeeToUpdate).then(() => {
      Swal.fire({
        position: "top-end", icon: "success", title: "Employee Edited Successfully", showConfirmButton: false, timer: 1500
      })
      this._router.navigate(['/'])
    }).catch((data) => {
      Swal.fire({ icon: "error", title: "Oops...", text: data ? data.error.text : "Something went wrong!" })

    })
  }

  closeDialog(): void {
    this.dialogRef.close()
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee },
    public dialogRef: MatDialogRef<EmployeeEditComponent>,
    private _service: EmployeeService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.employee = this.data.employee;
  }
}
