import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { SingleEmployeeComponent } from './single-employee/single-employee.component';
import { GeneralComponent } from './general/general.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './helpers/guards/auth.guard';

const routes: Routes = [
  { path: 'auth', component: LoginComponent },
  {
    path: 'employee',
    component: SingleEmployeeComponent,
    canActivate: [authGuard],
  },
  { path: '', component: EmployeeComponent, canActivate: [authGuard] },
  // { path: '', component: GeneralComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
