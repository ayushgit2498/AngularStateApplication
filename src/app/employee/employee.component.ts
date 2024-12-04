import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../Services/employee.service';
import { Employee } from '../Models/employee.model';
import { EmployeeState } from '../store/employee.state';
import { Select, Store } from '@ngxs/store';
import {
  DeleteEmployee,
  GetEmployees,
  UpdateEmployee,
} from '../store/employee.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  empForm: FormGroup;
  showModal: boolean = false;
  editMode: boolean = false;
  employees: Employee[] | undefined;
  employeeId: number = 0;

  @Select(EmployeeState.getEmployeeList) employees$:
    | Observable<Employee[]>
    | undefined;

  @Select(EmployeeState.isEmployeeDataPresent) isEmployeeDataPresent$:
    | Observable<boolean>
    | undefined;

  constructor(
    private fb: FormBuilder,
    private _empService: EmployeeService,
    private store: Store
  ) {
    this.empForm = this.fb.group({
      id: ['0'],
      name: ['', Validators.required],
      position: ['', Validators.required],
      dept: [''],
    });
  }

  ngOnInit(): void {
    if (this.store.selectSnapshot(EmployeeState.isEmployeeDataPresent)) {
      this.employees = this.store.selectSnapshot(EmployeeState.getEmployeeList);
      return;
    }

    this.getEmployees();
    this.employees$?.subscribe({
      next: (data) => {
        this.employees = data;
      },
    });
  }

  getEmployees() {
    this.store.dispatch(new GetEmployees());
    this.employees$?.subscribe({
      next: (data) => {
        this.employees = data;
      },
    });
  }

  onEmpSubmit() {
    if (this.empForm.valid) {
      console.log(this.empForm.value);

      let employeeRecord: Employee = {
        id: this.employeeId,
        name: this.empForm.value.name,
        position: this.empForm.value.position,
        dept: this.empForm.value.dept,
      };

      console.log(employeeRecord);

      if (this.editMode) {
        this.store.dispatch(new UpdateEmployee(employeeRecord));
        this.onCloseModal();
      } else {
        employeeRecord.id = 0;
        this._empService.addEmployee(employeeRecord).subscribe((data) => {
          this.getEmployees();
          this.onCloseModal();
        });
      }
    } else {
      let key = Object.keys(this.empForm.controls);
      key.filter((data) => {
        let control = this.empForm.controls[data];
        if (control.errors != null) {
          control.markAsTouched();
        }
      });
    }
  }

  onEditEmployee(id: number) {
    this.editMode = true;
    this.showModal = true;
    this.employeeId = id;

    var selectedEmployee = this.employees?.find((i) => i.id === id);

    this.empForm.reset({
      name: selectedEmployee?.name,
      position: selectedEmployee?.position,
      dept: selectedEmployee?.dept,
    });
  }

  onDeleteEmployee(id: any) {
    this.store.dispatch(new DeleteEmployee(id));
    this.employees$?.subscribe({
      next: (data) => {
        this.employees = data;
      },
    });
    // When we delete employee from store the store will be updated. In this case the selector of getEmployeeList will send
    // a signal to our observable of employee$. We have subsribed to this employee$ observable which updates the employee array used in html file
    // We can write the subsribe to selector code here again just for safety purpose
  }

  onAddEmployee() {
    this.editMode = false;
    this.showModal = true;
  }

  onCloseModal() {
    this.showModal = false;
    this.onReset();
    this.editMode = false;
  }

  onReset() {
    this.empForm.reset({
      id: 0,
      name: '',
      position: '',
      dept: '',
    });
  }
}
