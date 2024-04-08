import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  userName: string | undefined;

  logout() {
    sessionStorage.removeItem('Authorization');
    sessionStorage.removeItem('userName');
    Swal.fire({
      position: "bottom-end", title: "logged out successfully", showConfirmButton: false, timer: 1500
    })
  }

  constructor() { }

  ngOnInit(): void {
    this.userName = sessionStorage.getItem('userName')

    window.addEventListener('storage', (event) => {
      if (event.key === 'userName') {
        this.userName = event.newValue;
      }
    });
  }
}
