import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../modules/user/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isLoggedIn(): boolean {
    const token = sessionStorage.getItem('Authorization')
    return token != null && token != '';
  }

  constructor(private _router: Router) { }

  canActivate(): boolean {
    if (this.isLoggedIn()) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}
