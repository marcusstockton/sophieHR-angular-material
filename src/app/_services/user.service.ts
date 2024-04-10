import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public companyId = new BehaviorSubject(localStorage.getItem('currentCompanyId') || '');
  constructor() { }

  updateCompanyId(companyId: string) {
    this.companyId.next(companyId);
  }
}
