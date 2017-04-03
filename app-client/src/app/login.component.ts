import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from './auth.service';

import { AlertComponent } from './shared/alert.component';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

    private form: FormGroup;
    private working: boolean;
    
    @ViewChild(AlertComponent)
    private alert: AlertComponent;

    constructor(private authService: AuthService,
                private router: Router,
                private fb: FormBuilder) {
        this.form = fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.authService.logout();
    }

    public submit() {
        let username = this.form.get('username').value;
        let password = this.form.get('password').value;

        this.working = true;
        this.authService.login(username, password)
            .subscribe(
                res => {
                    this.working = false;
                    this.router.navigate(['/driver']);
                },
                err => {
                    this.working = false;
                    this.alert.show(err, 'danger');
                }
            );
    }

}
