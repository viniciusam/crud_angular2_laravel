import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/empty';

import { ApiService } from '../api.service';
import { AlertComponent } from '../shared/alert.component';
import { Driver } from '../model';

@Component({
    selector: 'driver-form',
    templateUrl: 'driver-form.component.html'
})
export class DriverFormComponent implements OnInit {

    private form: FormGroup;
    private saving: boolean;
    private loading: boolean;

    @ViewChild(AlertComponent)
    private alert: AlertComponent;

    constructor(private apiService: ApiService,
                private fb: FormBuilder,
                private router: Router,
                private route: ActivatedRoute) {
        this.form = fb.group({
            id:             [''],
            first_name:     ['', Validators.required],
            last_name:      ['', Validators.required],
            email:          ['', Validators.compose([Validators.required/*, AppValidators.email*/])],
            license_number: ['', Validators.required],
            license_exp:    ['', Validators.required],
        });
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => {
                if (params['id']) {
                    this.loading = true;
                    return this.apiService.findDriver(+params['id']);
                } else {
                    return Observable.empty();
                }
            })
            .subscribe((driver: Driver) => {
                this.loading = false;
                if (driver) {
                    this.form.setValue({
                        "id": driver.id,
                        "first_name": driver.first_name,
                        "last_name": driver.last_name,
                        "email": driver.email,
                        "license_number": driver.license_number,
                        "license_exp": driver.license_exp
                    });
                }
            });
    }

    public isInvalid(control: FormControl, validator?: string) {
        return control.touched &&
               ((!validator && control.errors) || (validator && control.hasError(validator)));
    }

    public submit() {
        // If form has the id value, then update the Driver.
        // Else creates a new one.
        let action: Observable<Boolean>;
        if (this.form.value['id'])
            action = this.apiService.updateDriver(this.form.value);
        else
            action = this.apiService.createDriver(this.form.value);
        
        this.saving = true;
        action.subscribe(
            res => this.router.navigate(['/driver']),
            err => {
                this.saving = false;
                this.alert.show(err, "danger");
            }
        );
    }

}
