import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  userForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    password: ['', [Validators.required]]
  });

  getFormControl(propetyName: string): FormControl {
    return this.userForm.get(propetyName) as FormControl
  }

  submit(): void {
    if (this.userForm.invalid) {
      Swal.fire({ icon: "error", title: "ERROR", text: "all fields are required" });
      return;
    }

    this._service.login(this.userForm.value)
      .then(() => {
        Swal.fire({
          position: "top-end", icon: "success", title: "Employee Added Successfully", showConfirmButton: false, timer: 1500
        })
        this._router.navigate(['/'])
      })
      .catch(() => {
        this.userForm.get('password')?.setErrors({ ...this.userForm.get('password').errors, incorrect: true })
      })
  }

  constructor(private formBuilder: FormBuilder, private _service: UserService, private _router: Router) { }

}
