import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CompaniesClient, CompanyDetailDto, EmployeeListDto, EmployeesClient } from '../client';
import { TokenStorageService } from '../_services/token-storage.service';

import { BoardManagerComponent } from './board-manager.component';

describe('BoardManagerComponent', () => {
  let component: BoardManagerComponent;
  let fixture: ComponentFixture<BoardManagerComponent>;

  beforeEach(async () => {
    const company: CompanyDetailDto = {
      id: '1',
      name: 'Test'
    };

    const mockCompaniesClient = jasmine.createSpyObj('CompaniesClient', ['getCompany']);
    mockCompaniesClient.getCompany.and.returnValue(of(company));

    const mockTokenStorageService = jasmine.createSpyObj('TokenStorageService', ['getUser']);
    mockTokenStorageService.getUser.and.returnValue({ companyId: '1', id: '1', role: 'Manager' });

    const mockEmployeesClient = jasmine.createSpyObj('EmployeesClient', ['getEmployeesForManager']);
    const employees: EmployeeListDto[] = [
      { id: '1' } as EmployeeListDto,
      { id: '2' } as EmployeeListDto
    ];
    mockEmployeesClient.getEmployeesForManager.and.returnValue(of(employees));

    await TestBed.configureTestingModule({
      declarations: [BoardManagerComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: CompaniesClient, useValue: mockCompaniesClient },
        { provide: TokenStorageService, useValue: mockTokenStorageService },
        { provide: EmployeesClient, useValue: mockEmployeesClient },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
