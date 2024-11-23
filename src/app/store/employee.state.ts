import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Employee } from '../Models/employee.model';
import { Injectable } from '@angular/core';
import {
  AddEmployee,
  DeleteEmployee,
  GetEmployee,
  GetEmployees,
  UpdateEmployee,
} from './employee.actions';
import { EmployeeService } from '../Services/employee.service';
import { tap } from 'rxjs';

export class EmployeeStateModel {
  employees!: Employee[];
  employeesLoaded!: Boolean;
  employee: Employee | undefined;
}

@State<EmployeeStateModel>({
  name: 'employeeState',
  defaults: {
    employees: [],
    employeesLoaded: false,
    employee: undefined,
  },
})
@Injectable()
export class EmployeeState {
  constructor(private _empService: EmployeeService) {}

  @Selector()
  static getEmployeeList(state: EmployeeStateModel) {
    return state.employees;
  }

  @Selector()
  static isEmployeeDataPresent(state: EmployeeStateModel) {
    return state.employeesLoaded;
  }

  @Selector()
  static getSelectedEmployee(state: EmployeeStateModel) {
    return state.employee;
  }

  @Action(GetEmployees)
  getEmployees({ getState, setState }: StateContext<EmployeeStateModel>) {
    return this._empService.getEmployeeList().pipe(
      tap((value: Employee[]) => {
        var state = getState();

        setState({
          ...state,
          employees: value,
          employeesLoaded: true,
        });
      })
    );
  }

  @Action(GetEmployee)
  getEmployee(
    { getState, patchState }: StateContext<EmployeeStateModel>,
    { id }: GetEmployee
  ) {
    var employees = getState().employees;

    var employee = employees.find((emp) => emp.id === id);

    if (employee) {
      patchState({
        employee: employee,
      });
      return;
    } else {
      return this._empService.getEmployeebyId(id.toString()).pipe(
        tap((res: Employee) => {
          patchState({
            employee: res,
          });
        })
      );
    }
  }

  @Action(DeleteEmployee)
  deleteEmployee(
    { getState, patchState }: StateContext<EmployeeStateModel>,
    { id }: DeleteEmployee
  ) {
    return this._empService.deleteEmployee(id).pipe(
      tap((status) => {
        if (status) {
          var employees = getState().employees;
          employees = employees.filter((emp) => emp.id !== id);
          patchState({
            employees: employees,
          });
        } else {
          console.log('Error occurred while deleting employee');
        }
      })
    );
  }

  @Action(UpdateEmployee)
  updateEmployee(
    { getState, patchState }: StateContext<EmployeeStateModel>,
    { emp }: UpdateEmployee
  ) {
    return this._empService.updateEmployee(emp).pipe(
      tap((status) => {
        if (status) {
          var employees = getState().employees;

          var index = employees.findIndex((i) => i.id === emp.id);

          if (index !== -1) {
            employees[index] = emp;
            patchState({
              employees: employees,
            });
          }
        }
      })
    );
  }
}
