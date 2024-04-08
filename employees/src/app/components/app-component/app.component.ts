import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeModule } from '../../modules/employee/employee.module';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header-component/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, EmployeeModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
