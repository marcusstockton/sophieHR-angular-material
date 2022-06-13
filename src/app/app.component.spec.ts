import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CompaniesClient } from './client';
import { TokenStorageService } from './_services/token-storage.service';
import { UserService } from './_services/user.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    const mockTokenStorageService = jasmine.createSpyObj('TokenStorageService', ['getToken', 'getUser', 'signOut']);
    const mockUserService = jasmine.createSpyObj('UserService', ['updateCompanyId'])
    const mockCompaniesClient = jasmine.createSpyObj('CompaniesClient', ['getCompanyNames'])
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers:[
        { provide: TokenStorageService, useValue: mockTokenStorageService },
        { provide: UserService, useValue: mockUserService },
        { provide: CompaniesClient, useValue: mockCompaniesClient }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
