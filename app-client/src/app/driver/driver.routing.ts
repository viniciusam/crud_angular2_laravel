import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth.guard';

import { DriverComponent } from './driver.component';
import { DriverListComponent } from './driver-list.component';
import { DriverFormComponent } from './driver-form.component';

export const driverRoutes: Routes = [
    {
        path: 'driver',
        component: DriverComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: DriverListComponent },
            { path: 'new', component: DriverFormComponent },
            { path: ':id/edit', component: DriverFormComponent }
        ]
    }
];

export const driverRoutingProviders: any[] = [];

export const driverRouting: ModuleWithProviders = RouterModule.forChild(driverRoutes);
