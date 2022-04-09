import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompanyDetailDto } from 'src/libs/client';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' })
};

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  getCompanyById(companyId: string): Observable<CompanyDetailDto>{
    return this.http.get<CompanyDetailDto>(`${environment.base_url}/companies/${companyId}`, httpOptions);
  }
}
