import { State } from '@ngxs/store';
import { Employee } from '../Models/employee.model';
import { Injectable } from '@angular/core';

export class EmployeeStateModel {
  employees!: Employee[];
}

@State<EmployeeStateModel>({
  name: 'employeeState',
  defaults: {
    employees: [],
  },
})
@Injectable()
export class EmployeeState {}
