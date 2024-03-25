import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/employees'},
    {path: 'employees', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule) }
];
