import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { driverRouting } from './driver.routing';
import { ApiService } from '../api.service';

import { DriverComponent } from './driver.component';
import { DriverListComponent } from './driver-list.component';
import { DriverFormComponent } from './driver-form.component';

@NgModule({
  imports: [
    driverRouting,
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    DriverComponent,
    DriverListComponent,
    DriverFormComponent
  ],
  providers: [
    ApiService
  ],
  bootstrap: [
    DriverComponent
  ]
})
export class DriverModule { }
