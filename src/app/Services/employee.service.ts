import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Models/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  url = 'https://localhost:7253/api/employee';

  constructor(private http: HttpClient) {}

  addEmployee(emp: Employee) {
    return this.http.post(this.url, emp);
  }

  getEmployeeList() {
    return this.http.get<Employee[]>(this.url + '/getEmployees');
  }

  getEmployeebyId(id: string): Observable<Employee> {
    return this.http.get<Employee>(this.url + '?id=' + id);
  }

  updateEmployee(emp: Employee) {
    return this.http.patch(this.url, emp);
  }

  deleteEmployee(id: number | string) {
    return this.http.delete(this.url + '?id=' + id);
  }
}
