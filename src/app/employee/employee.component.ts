import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../Services/employee.service';
import { Employee } from '../Models/employee.model';

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

  constructor(private fb: FormBuilder, private _empService: EmployeeService) {
    this.empForm = this.fb.group({
      id: ['0'],
      name: ['', Validators.required],
      position: ['', Validators.required],
      dept: [''],
    });
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this._empService
      .getEmployeeList()
      .subscribe((data) => (this.employees = data));
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
        this._empService.updateEmployee(employeeRecord).subscribe((data) => {
          this.getEmployees();
          this.onCloseModal();
        });
      } else {
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
  }

  onDeleteEmployee(id: any) {
    this._empService.deleteEmployee(id).subscribe((data) => {
      this.getEmployees();
    });
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
      name: '',
      position: '',
      dept: '',
    });
  }
}
