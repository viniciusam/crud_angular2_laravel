import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingIndicatorComponent } from './loading-indicator.component';
import { AlertComponent } from './alert.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoadingIndicatorComponent,
    AlertComponent
  ],
  exports: [
    LoadingIndicatorComponent,
    AlertComponent
  ]
})
export class SharedModule { }
