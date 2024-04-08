import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { SessionStorageService } from '../../services/session-storage.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userName: string | null = null;
  subscription: Subscription;

  logout(): void {
    this._service.removeItem('Authorization');
    this._service.removeItem('userName');
    this.userName = null;
    Swal.fire({
      position: "bottom-end", title: "logged out successfully", showConfirmButton: false, timer: 1500
    })
    this._router.navigate(['/login'])
  }

  constructor(private _service: SessionStorageService, private _router: Router) { }

  ngOnInit(): void {
    this.userName = this._service.getItem('userName');
    this.subscription = this._service.watchStorage().subscribe((change) => {
      if (change.key === 'userName') {
        this.userName = change.value;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
