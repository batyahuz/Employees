import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrl: './employee-search.component.css'
})
export class EmployeeSearchComponent implements OnInit {
  @Output()
  filterEmployees: EventEmitter<Employee[]> = new EventEmitter();

  searchTerms = new Subject<string>();

  clearSearch(value: HTMLInputElement): void { value.value = ''; }

  search(value: HTMLInputElement): void { this.searchTerms.next(value.value) }

  constructor(private _service: EmployeeService) { }

  ngOnInit(): void {
    this.searchTerms.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((res) => this._service.getEmployees({ query: res }))
    ).subscribe((res) => this.filterEmployees.emit(res))
  }
}
