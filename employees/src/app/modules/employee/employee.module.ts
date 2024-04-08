import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './employee.routes';
import { EmplyeesTableComponent } from './components/emplyees-table/emplyees-table.component';
import { EmployeeService } from './services/employee.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { EmployeeMainComponent } from './components/employee-main/employee-main.component';
import { ExportEmployeeToExcelComponent } from './components/export-employee-to-excel/export-employee-to-excel.component';
import { EmployeeSearchComponent } from './components/employee-search/employee-search.component';
import { HeaderInterceptor } from './interceptors/header.interceptor';
import { RoleService } from './services/role.service';
import { InputFieldComponent } from '../../components/input-field-component/input-field.component';

@NgModule({
  declarations: [
    EmplyeesTableComponent,
    EmployeeAddComponent,
    EmployeeEditComponent,
    EmployeeFormComponent,
    EmployeeMainComponent,
    ExportEmployeeToExcelComponent,
    EmployeeSearchComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    InputFieldComponent
    /*, MatDialogModule*/
  ],
  providers: [
    EmployeeService,
    RoleService,
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true }
  ]
})
export class EmployeeModule { }
