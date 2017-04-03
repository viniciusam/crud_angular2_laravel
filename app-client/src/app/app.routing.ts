import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login.component';

export const rootRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '/' }
];

export const rootRoutingProviders: any[] = [];

export const rootRouting: ModuleWithProviders = RouterModule.forRoot(rootRoutes);
