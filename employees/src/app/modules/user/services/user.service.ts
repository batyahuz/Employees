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
          this.setSessionStorage(data.token)
          res(data)
        }, error: (error) => {
          rej(error)
        }
      }))
  }

  private setSessionStorage(data: string) {
    sessionStorage.setItem('Authorization', data)
  }

  constructor(private _http: HttpClient) { }
}
