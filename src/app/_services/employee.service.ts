import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmployeeList } from '../_models/EmployeeList';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployeesByManagerId(managerId: string): Observable<EmployeeList[]>{
    return this.http.get<EmployeeList[]>(`${environment.base_url}/Employees/list-of-employees-for-manager/${managerId}`, httpOptions);
  }
}
