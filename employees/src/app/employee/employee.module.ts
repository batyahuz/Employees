import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './employee.routes';
import { EmplyeesTableComponent } from './components/emplyees-table/emplyees-table.component';
import { EmployeeService } from './employee.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { EmployeeMainComponent } from './components/employee-main/employee-main.component';
import { ExportEmployeeToExcelComponent } from './components/export-employee-to-excel/export-employee-to-excel.component';
import { EmployeeSearchComponent } from './components/employee-search/employee-search.component';
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
