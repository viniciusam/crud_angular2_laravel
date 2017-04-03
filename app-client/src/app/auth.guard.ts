import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { ApiService } from './api.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private apiService: ApiService) { }

    canActivate() {
        if (localStorage.getItem('token')) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }

}
