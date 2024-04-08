import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly route = 'api/Auth';

  login(user: { name: string, password: string }): Promise<any> {
    return new Promise((res, rej) => this._http.post(this.route, user)
      .subscribe({
        next: (data: any) => {
          this.setSessionStorage(data.token, user.name)
          res(data)
        }, error: (error) => {
          rej(error)
        }
      }))
  }

  private setSessionStorage(token: string, name: string) {
    sessionStorage.setItem('Authorization', token)
    sessionStorage.setItem('userName', name)
  }

  constructor(private _http: HttpClient) { }
}
