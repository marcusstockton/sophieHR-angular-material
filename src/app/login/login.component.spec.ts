import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { provideRouter, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AccountClient } from '../client';
import { TokenStorageService } from '../_services/token-storage.service';

import { LoginComponent } from './login.component';
import { MaterialModule } from '../material/material.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAccountClient: jasmine.SpyObj<AccountClient>;
  let mockTokenStorageService: jasmine.SpyObj<TokenStorageService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Temporary development helper endpoints: remove from the generated client contract
    // when the production login service no longer exposes manager/admin list fetches.
    mockAccountClient = jasmine.createSpyObj('AccountClient', ['getToken', 'getListOfManagers', 'getListOfCompanyAdmins']);
    mockAccountClient.getListOfManagers.and.returnValue(of([]));
    mockAccountClient.getListOfCompanyAdmins.and.returnValue(of([]));

    mockAccountClient.getToken.and.returnValue(of({ token: 'abc-token', id: '42', role: 'Admin' } as any));

    mockTokenStorageService = jasmine.createSpyObj('TokenStorageService', ['getToken', 'getUser', 'saveToken', 'saveUser']);
    mockTokenStorageService.getToken.and.returnValue(null);
    mockTokenStorageService.getUser.and.returnValue({ role: 'Admin' } as any);

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MaterialModule],
      declarations: [LoginComponent],
      providers: [
        provideRouter([]),
        { provide: AccountClient, useValue: mockAccountClient },
        { provide: TokenStorageService, useValue: mockTokenStorageService },
        { provide: Router, useValue: mockRouter },
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

  it('should initialize the login form with the expected default credentials', () => {
    expect(component.form).toBeTruthy();
    expect(component.form.get('username')?.value).toBe('admin@hr.com');
    expect(component.form.get('password')?.value).toBe('P@55w0rd1');
  });

  it('should save the session token and user payload and route the admin user after a successful login', () => {
    component.form.setValue({ username: 'admin@hr.com', password: 'P@55w0rd1' });
    mockTokenStorageService.getUser.and.returnValue({ role: 'Admin' } as any);

    component.onSubmit(component.form);

    const savedUser = mockTokenStorageService.saveUser.calls.mostRecent().args[0] as any;

    expect(mockAccountClient.getToken).toHaveBeenCalled();
    expect(mockTokenStorageService.saveToken).toHaveBeenCalledWith('abc-token');
    expect(savedUser.token).toBe('abc-token');
    expect(savedUser.id).toBe('42');
    expect(savedUser.role).toBe('Admin');
    expect(component.isLoggedIn).toBeTrue();
    expect(component.isLoginFailed).toBeFalse();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/admin']);
  });

  it('should flag login failed when the backend rejects the login request', () => {
    component.form.setValue({ username: 'admin@hr.com', password: 'P@55w0rd1' });
    mockAccountClient.getToken.and.returnValue(throwError(() => new Error('boom')));

    component.onSubmit(component.form);

    expect(component.loggingIn).toBeFalse();
    expect(component.isLoginFailed).toBeTrue();
    expect(component.isLoggedIn).toBeFalse();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
