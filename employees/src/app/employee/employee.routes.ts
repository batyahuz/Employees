import { Routes } from '@angular/router';
import { EmplyeesTableComponent } from './emplyees-table/emplyees-table.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeMainComponent } from './employee-main/employee-main.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: EmployeeMainComponent },
    { path: 'add', component: EmployeeAddComponent },
    { path: 'edit/:id', component: EmployeeEditComponent }
];
