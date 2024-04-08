import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeModule } from '../../employee/employee.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, EmployeeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}