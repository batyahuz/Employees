import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-emplyees-table',
  templateUrl: './emplyees-table.component.html',
  styleUrl: './emplyees-table.component.css'
})
export class EmplyeesTableComponent {
  @Input()
  employees: Employee[];

  @Output()
  add: EventEmitter<any> = new EventEmitter();

  @Output()
  delete: EventEmitter<number> = new EventEmitter();

  @Output()
  edit: EventEmitter<Employee> = new EventEmitter();

  addEmployee() { this.add.emit() }

  deleteEmployee(id: number) { this.delete.emit(id) }

  editEmployee(employee: Employee) { this.edit.emit(employee) }
}
