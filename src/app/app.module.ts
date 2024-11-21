import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeComponent } from './employee/employee.component';
import { SingleEmployeeComponent } from './single-employee/single-employee.component';
import { DesignutilityService } from './Services/designutility.service';
import { EmployeeService } from './Services/employee.service';
import { GeneralComponent } from './general/general.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { appStates, storageSettings } from './store';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    SingleEmployeeComponent,
    GeneralComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forRoot(appStates, {
      developmentMode: /** !environment.production */ false,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      keys: storageSettings,
    }),
  ],
  providers: [DesignutilityService, EmployeeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
