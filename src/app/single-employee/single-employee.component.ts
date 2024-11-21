import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../Services/employee.service';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../Models/employee.model';

@Component({
  selector: 'app-single-employee',
  templateUrl: './single-employee.component.html',
  styleUrls: ['./single-employee.component.scss'],
})
export class SingleEmployeeComponent implements OnInit {
  employeeId: string = '';
  employee: Employee | undefined;

  constructor(
    private _empService: EmployeeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.employeeId = params['id'];
    });

    this._empService
      .getEmployeebyId(this.employeeId)
      .subscribe((data) => (this.employee = data));
  }
}
