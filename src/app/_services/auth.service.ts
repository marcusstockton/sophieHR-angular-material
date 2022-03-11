import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const AUTH_API = 'http://localhost:5189/api/Account/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'GetToken', {
      username,
      password
    }, httpOptions);
  }
  register(emailAddress: string, firstName:string, lastName: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'RegisterNewUser', {
      firstName,
      lastName,
      emailAddress,
      password
    }, httpOptions);
  }
}
