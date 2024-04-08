import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.css'
})
export class EmployeeAddComponent implements OnInit {
  employee: Employee;

  addEmployee(employeeToAdd: Employee) {
    this._service.addEmployee(employeeToAdd).then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Employee Added Successfully",
        showConfirmButton: false,
        timer: 1500
      })
      this._router.navigate(['/'])
    }).catch((data) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
      })
    })
  }

  constructor(private _service: EmployeeService, private _router: Router) { }

  ngOnInit(): void {
    this.employee = new Employee()
  }
}
