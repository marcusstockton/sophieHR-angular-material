import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { AccountClient } from '../client';
import { TokenStorageService } from '../_services/token-storage.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    const mockAccountClient = jasmine.createSpyObj('AccountClient', ['getToken', 'getListOfManagers', 'getListOfCompanyAdmins']);
    mockAccountClient.getListOfManagers.and.returnValue(of(['Manager1', 'Manager2', 'Manager3', 'Manager4']));
    mockAccountClient.getListOfCompanyAdmins.and.returnValue(of(['Admin1', 'Admin2']));

    const mockTokenStorageService = jasmine.createSpyObj('TokenStorageService', ['getToken', 'getUser', 'saveToken', 'saveUser']);
    mockTokenStorageService.getToken.and.returnValue(null);
    mockTokenStorageService.getUser.and.returnValue(null);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        provideRouter([]),
        { provide: AccountClient, useValue: mockAccountClient },
        { provide: TokenStorageService, useValue: mockTokenStorageService },
        UntypedFormBuilder,
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
