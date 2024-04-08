import { Routes } from '@angular/router';
import { EmplyeesTableComponent } from './components/emplyees-table/emplyees-table.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeeMainComponent } from './components/employee-main/employee-main.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: EmployeeMainComponent },
    { path: 'add', component: EmployeeAddComponent },
    { path: 'edit/:id', component: EmployeeEditComponent }
];
