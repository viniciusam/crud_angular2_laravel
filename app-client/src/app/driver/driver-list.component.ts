import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';
import { Driver } from '../model';

@Component({
    selector: 'driver-list',
    templateUrl: 'driver-list.component.html'
})
export class DriverListComponent implements OnInit {

    private drivers: Driver[];

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.apiService.getDriversList()
            .subscribe(
                res => { this.drivers = res }
            );
    }

    delete(driver: Driver) {
        let i = this.drivers.indexOf(driver);
        this.drivers.splice(i, 1);
        this.apiService.deleteDriver(driver)
            .subscribe(
                res => {},
                err => { this.drivers.splice(i, 0, driver) }
            );
    }

}
