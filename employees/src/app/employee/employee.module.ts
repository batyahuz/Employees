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
import { EmployeeMainComponent } from './employee-main/employee-main.component';
import { ExportEmployeeToExcelComponent } from './export-employee-to-excel/export-employee-to-excel.component';
import { EmployeeSearchComponent } from './employee-search/employee-search.component';
// import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [EmplyeesTableComponent,
    EmployeeAddComponent,
    EmployeeEditComponent,
    EmployeeFormComponent,
    EmployeeMainComponent,
    ExportEmployeeToExcelComponent,
    EmployeeSearchComponent
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
