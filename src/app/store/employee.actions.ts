import { Employee } from '../Models/employee.model';

export class GetEmployees {
  static readonly type = '[Employees] GetEmployees';
}

export class GetEmployee {
  static readonly type = '[Employees] Get';
  constructor(public id: number) {}
}

export class AddEmployee {
  static readonly type = '[Employees] Add';
  constructor(public emp: Employee) {}
}

export class UpdateEmployee {
  static readonly type = '[Employees] Update';
  constructor(public emp: Employee) {}
}

export class DeleteEmployee {
  static readonly type = '[Employees] Delete';
  constructor(public id: number) {}
}
