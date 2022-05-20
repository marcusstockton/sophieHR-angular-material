// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
// const AUTH_API = environment.base_url + '/Account/';
// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' })
// };

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor(private http: HttpClient) { }
//   login(username: string, password: string): Observable<any> {
//     return this.http.post(AUTH_API, {
//       username,
//       password
//     }, httpOptions);
//   }
//   register(emailAddress: string, firstName: string, lastName: string, password: string): Observable<any> {
//     return this.http.post(AUTH_API + 'RegisterNewUser', {
//       firstName,
//       lastName,
//       emailAddress,
//       password
//     }, httpOptions);
//   }
// }
