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

  updateEmployee(emp: Employee): Observable<boolean> {
    return this.http.patch<boolean>(this.url, emp);
  }

  deleteEmployee(id: number | string): Observable<boolean> {
    return this.http.delete<boolean>(this.url + '?id=' + id);
  }
}
