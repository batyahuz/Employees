import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorageService } from '../../../services/session-storage.service';

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
    this._service.setItem('Authorization', token)
    this._service.setItem('userName', name)
  }

  constructor(private _http: HttpClient, private _service: SessionStorageService) { }
}
