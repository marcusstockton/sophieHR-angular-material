import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { CompaniesClient, CompanyDetailDto, EmployeeListDto, EmployeesClient } from '../client';
import { MaterialModule } from '../material/material.module';
import { TokenStorageService } from '../_services/token-storage.service';

import { BoardManagerComponent } from './board-manager.component';

@Component({
  selector: 'app-employee-count-chart',
  template: '',
  standalone: false
})
class EmployeeCountChartStubComponent {
  @Input() companyId!: string;
}

@Component({
  selector: 'app-map',
  template: '',
  standalone: false
})
class MapStubComponent {
  @Input() lat!: number | string | undefined;
  @Input() lng!: number | string | undefined;
}

describe('BoardManagerComponent', () => {
  let component: BoardManagerComponent;
  let fixture: ComponentFixture<BoardManagerComponent>;
  let mockCompaniesClient: jasmine.SpyObj<CompaniesClient>;
  let mockTokenStorageService: jasmine.SpyObj<TokenStorageService>;
  let mockEmployeesClient: jasmine.SpyObj<EmployeesClient>;

  beforeEach(async () => {
    const company: CompanyDetailDto = {
      id: '1',
      name: 'Test'
    };

    mockCompaniesClient = jasmine.createSpyObj('CompaniesClient', ['getCompany']);
    mockCompaniesClient.getCompany.and.returnValue(of(company));

    mockTokenStorageService = jasmine.createSpyObj('TokenStorageService', ['getUser']);
    mockTokenStorageService.getUser.and.returnValue({ companyId: '1', id: '1', role: 'Manager' });

    mockEmployeesClient = jasmine.createSpyObj('EmployeesClient', ['getEmployeesForManager']);
    const employees: EmployeeListDto[] = [
      { id: '1' } as EmployeeListDto,
      { id: '2' } as EmployeeListDto
    ];
    mockEmployeesClient.getEmployeesForManager.and.returnValue(of(employees));

    await TestBed.configureTestingModule({
      declarations: [
        BoardManagerComponent,
        EmployeeCountChartStubComponent,
        MapStubComponent,
      ],
      imports: [
        MaterialModule,
      ],
      providers: [
        provideRouter([]),
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

  it('should load the company summary and employee list for the current manager user', () => {
    expect(mockTokenStorageService.getUser).toHaveBeenCalled();
    expect(mockCompaniesClient.getCompany).toHaveBeenCalledWith('1');
    expect(mockEmployeesClient.getEmployeesForManager).toHaveBeenCalledWith('1');
    expect(component.company?.id).toBe('1');
    expect(component.company?.name).toBe('Test');
    expect(component.totalEmployees).toBe(2);
    expect(component.dataSource.data.length).toBe(2);
    expect(component.isLoading).toBeFalse();
  });
});
