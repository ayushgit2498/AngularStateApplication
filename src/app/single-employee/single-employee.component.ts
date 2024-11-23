import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../Services/employee.service';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../Models/employee.model';
import { Select, Store } from '@ngxs/store';
import { GetEmployee } from '../store/employee.actions';
import { EmployeeState } from '../store/employee.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-single-employee',
  templateUrl: './single-employee.component.html',
  styleUrls: ['./single-employee.component.scss'],
})
export class SingleEmployeeComponent implements OnInit {
  employeeId: string = '';
  employee: Employee | undefined;
  @Select(EmployeeState.getSelectedEmployee) employee$:
    | Observable<Employee>
    | undefined;

  constructor(
    private _empService: EmployeeService,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.employeeId = params['id'];
    });

    this.store.dispatch(new GetEmployee(Number(this.employeeId)));

    // select snapshot would have been useful here if state was stored in local storage but for learning purpose
    // I am not storing employee state in local storage

    // this.employee = this.store.selectSnapshot(
    //   EmployeeState.getSelectedEmployee
    // );

    this.employee$?.subscribe((employee) => {
      console.log('Get Employee in subscribe');

      console.log(employee);
      this.employee = employee;
    });

    // this._empService
    //   .getEmployeebyId(this.employeeId)
    //   .subscribe((data) => (this.employee = data));
  }
}
