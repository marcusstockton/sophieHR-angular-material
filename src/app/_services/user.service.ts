import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
const API_URL = 'http://localhost:8080/api/';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public companyId = new BehaviorSubject("");
  constructor(private http: HttpClient) { }

  updateCompanyId(companyId:string){
    this.companyId.next(companyId);
  }

}
