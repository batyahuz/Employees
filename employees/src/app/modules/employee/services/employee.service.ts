import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { RoleName } from '../models/role.name.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly route = 'api/Employee';

  getEmployees(options: { status?: boolean | null, query?: string | null }): Observable<Employee[]> {
    const { status, query } = options;
    let url = this.route + '?';
    if (status !== undefined && status !== null) { url += 'status=' + status + '&'; }
    if (query !== undefined && query !== null) { url += 'query=' + query; }
    return this._http.get<Employee[]>(url);
  }

  getEmployeeById(id: number, status: boolean | null = null): Observable<any> {
    return this._http.get(this.route + '/' + id + (status ? '?status=' + status : ''))
  }

  addEmployee(emp: Employee): Promise<any> {
    return new Promise((res, rej) => {
      this._http.post<Employee>(this.route, emp)
        .subscribe({ next: (data) => res(data), error: (error) => rej(error) })
    })
  }

  updateEmployeeById(emp: Employee): Promise<any> {
    return new Promise((res, rej) => {
      this._http.put<Employee>(this.route + '/' + emp.id, emp)
        .subscribe({ next: (data) => res(data), error: (error) => rej(error) })
    })
  }

  deleteEmployeeById(id: number): Promise<any> {
    return new Promise((res, rej) => {
      this._http.delete(this.route + '/' + id)
        .subscribe({ next: (data) => res(data), error: (error) => rej(error) })
    })
  }

  constructor(private _http: HttpClient) { }
}
