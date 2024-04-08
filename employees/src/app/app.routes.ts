import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/employees' },
    { path: 'employees', loadChildren: () => import('./modules/employee/employee.module').then(m => m.EmployeeModule) },
    { path: 'authorization', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) }
];
