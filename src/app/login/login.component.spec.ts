import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AccountClient } from '../client';
import { TokenStorageService } from '../_services/token-storage.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    const mockAccountClient = jasmine.createSpyObj('AccountClient', ['getToken', 'getListOfManagers'])
    mockAccountClient.getListOfManagers.and.returnValue(of(["Manager1", "Manager2", "Manager3", "Manager4"]))
    const mockTokenStorageService = jasmine.createSpyObj('TokenStorageService', ['getToken', 'getUser', 'saveToken', 'saveUser'])

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[RouterTestingModule],
      providers: [
        {provide: AccountClient, useValue: mockAccountClient},
        {provide: TokenStorageService, useValue: mockTokenStorageService},
        FormBuilder,
      ]
    })
    .compileComponents();
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
