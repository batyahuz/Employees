import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './employee.routes';
import { EmplyeesTableComponent } from './emplyees-table/emplyees-table.component';
import { EmployeeService } from './employee.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
// import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [EmplyeesTableComponent,
    EmployeeAddComponent,
    EmployeeEditComponent,
    EmployeeFormComponent,
  ],
  imports: [RouterModule.forChild(routes),
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule
    /*, MatDialogModule*/
  ],
  providers: [EmployeeService]
})
export class EmployeeModule { }
