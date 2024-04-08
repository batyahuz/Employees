import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard.guard';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/employees' },
    { path: 'employees', loadChildren: () => import('./modules/employee/employee.module').then(m => m.EmployeeModule), canActivate: [AuthGuard] },
    { path: 'login', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) }
];
