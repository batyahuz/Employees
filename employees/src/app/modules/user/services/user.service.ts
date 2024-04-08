import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly api = 'api/Auth';

  login(user: { name: string, password: string }): void {
    let r = this._http.post("kl", user);
  }
  constructor(private _http: HttpClient) { }
}
