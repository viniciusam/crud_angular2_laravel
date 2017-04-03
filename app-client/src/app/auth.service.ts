import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Token } from './model';

@Injectable()
export class AuthService {

  private tokenEndpoint = 'http://localhost:8000/oauth/token';

  constructor(private http: Http) {

  }

  public login(email, password): Observable<Boolean> {
    let authData = {
      grant_type: 'password',
      client_id: 1,
      client_secret: '2T1m1VMoAuRXCqoq1sDHgFFhHbITtlbxc0AT4rQz',
      username: email,
      password: password,
      scopes: ''
    }

    return this.http.post(this.tokenEndpoint, authData)
      .map(res => {
        let token: Token = res.json();
        localStorage.setItem('token', JSON.stringify(token));
      })
      .catch(() => Observable.throw('Email or password invalid.'));
  }

  public logout() {
    localStorage.removeItem('token');
  }

  public isLogged() {
      return (localStorage.getItem('token') != null);
  }

}
