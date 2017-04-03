import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Token, Driver } from './model';

@Injectable()
export class ApiService {

  private apiEndpoint = 'http://localhost:8000/api';

  constructor(private http: Http) {

  }

  private getAuthHeader(): Headers {
    let token: Token = JSON.parse(localStorage.getItem('token'));
    console.log(token);
    return new Headers({
      "Authorization": 'Bearer ' + token.access_token
    })
  }

  public getDriversList(): Observable<Driver[]> {
    return this.http.get(this.apiEndpoint + '/drivers', { headers: this.getAuthHeader() })
      .map(res => res.json())
      .catch(this.handleError);
  }

  public findDriver(id: number): Observable<Driver> {
    return this.http.get(this.apiEndpoint + '/drivers/' + id, { headers: this.getAuthHeader() })
      .map(res => res.json())
      .catch(this.handleError);
  }

  public createDriver(driver: Driver): Observable<Boolean> {
    return this.http.post(this.apiEndpoint + '/drivers/create', driver, { headers: this.getAuthHeader() })
      .map(res => res.json())
      .catch(this.handleError);
  }

  public updateDriver(driver: Driver): Observable<Boolean> {
    return this.http.put(this.apiEndpoint + '/drivers/' + driver.id + '/update', driver, { headers: this.getAuthHeader() })
      .map(res => res.json())
      .catch(this.handleError);
  }

  public deleteDriver(driver: Driver): Observable<Boolean> {
    return this.http.delete(this.apiEndpoint + '/drivers/' + driver.id + '/delete', { headers: this.getAuthHeader() })
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
