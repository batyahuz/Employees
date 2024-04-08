import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  username: string | null = null;

  userName: string | undefined;
  show: boolean = false;

  accessToken(): string | undefined {
    const token = sessionStorage.getItem('Authorization')
    if (token) {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(atob(base64)?.split('')?.map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      }).join(''))
      return JSON.parse(jsonPayload)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    }
    else return undefined;
  }

  logout() { sessionStorage.removeItem('Authorization'); }

  showLogout() {
    this.show = !this.show;
    console.log('show!!', this.show);
  }

  constructor() { }

  ngOnInit(): void {
    this.username = this.accessToken();

    window.addEventListener('storage', (event) => {
      if (event.key === 'Authorization') {
        this.username = this.accessToken();
      }
    });
  }
}
