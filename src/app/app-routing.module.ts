import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { SingleEmployeeComponent } from './single-employee/single-employee.component';
import { GeneralComponent } from './general/general.component';

const routes: Routes = [
  { path: 'employee', component: SingleEmployeeComponent },
  { path: '', component: EmployeeComponent },
  // { path: '', component: GeneralComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
