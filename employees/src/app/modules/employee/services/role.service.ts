import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { RoleName } from '../models/role.name.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private readonly api = 'api/';

  getRolesNames(): Observable<RoleName[]> {
    return this._http.get<RoleName[]>(this.api + 'Role')
  }
  constructor(private _http: HttpClient) { }
}
