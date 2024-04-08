import { Component } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

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
        position: "top-end",
        icon: "success",
        title: "Employee Edited Successfully",
        showConfirmButton: false,
        timer: 1500
      })
      this._router.navigate(['/'])
    }).catch((data) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: data ? data.error.text : "Something went wrong!"
      })

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
