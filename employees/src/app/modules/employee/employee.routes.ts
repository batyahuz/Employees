import { Routes } from '@angular/router';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeeMainComponent } from './components/employee-main/employee-main.component';
import { AuthGuard } from '../../guards/auth-guard.guard';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: EmployeeMainComponent, canActivate: [AuthGuard] }//,
    // { path: 'add', component: EmployeeAddComponent, canActivate: [AuthGuard] },
    // { path: 'edit/:id', component: EmployeeEditComponent, canActivate: [AuthGuard] }
];
