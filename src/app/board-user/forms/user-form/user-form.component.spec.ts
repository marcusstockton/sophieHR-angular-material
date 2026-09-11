import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CompaniesClient, DepartmentsClient, EmployeesClient, KeyValuePairOfGuidAndstring } from 'src/app/client';

import { UserFormComponent } from './user-form.component';
import { BoardUserModule } from '../../board-user.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MaterialModule } from 'src/app/material/material.module';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let mockEmployeesClient: jasmine.SpyObj<EmployeesClient>;
  let mockCompaniesClient: jasmine.SpyObj<CompaniesClient>;
  let mockDepartmentsClient: jasmine.SpyObj<DepartmentsClient>;

  beforeEach(async () => {
    mockEmployeesClient = jasmine.createSpyObj('EmployeesClient', [
      'getTitles',
      'getRoles',
      'getEmployee',
      'getManagersForCompanyId',
      'postEmployee',
    ]);

    mockEmployeesClient.getTitles.and.returnValue(of(['Mr', 'Mrs', 'Sir']));
    mockEmployeesClient.getRoles.and.returnValue(of(['User', 'Manager', 'Admin']));
    mockEmployeesClient.getManagersForCompanyId.and.returnValue(of([]));

    mockCompaniesClient = jasmine.createSpyObj('CompaniesClient', ['getCompanyNames']);
    const companyList: KeyValuePairOfGuidAndstring[] = [
      { key: '1', value: 'Test' } as KeyValuePairOfGuidAndstring
    ];
    mockCompaniesClient.getCompanyNames.and.returnValue(of(companyList));

    mockDepartmentsClient = jasmine.createSpyObj('DepartmentsClient', ['getDepartmentsByCompanyId']);
    mockDepartmentsClient.getDepartmentsByCompanyId.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [UserFormComponent],
      imports: [BoardUserModule, MaterialModule],
      providers: [
        UntypedFormBuilder,
        provideRouter([]),
        { provide: EmployeesClient, useValue: mockEmployeesClient },
        { provide: CompaniesClient, useValue: mockCompaniesClient },
        { provide: DepartmentsClient, useValue: mockDepartmentsClient },
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({})) } },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the title, role and company lookup sources into component state', () => {
    expect(mockEmployeesClient.getTitles).toHaveBeenCalled();
    expect(mockEmployeesClient.getRoles).toHaveBeenCalled();
    expect(mockCompaniesClient.getCompanyNames).toHaveBeenCalled();
    expect(component.titles).toEqual(['Mr', 'Mrs', 'Sir']);
    expect(component.employeeTypes).toEqual(['User', 'Manager', 'Admin']);
    expect(component.companies.length).toBe(1);
    expect(component.companies[0].key).toBe('1');
  });

  it('should request the manager and department lists when the only company in the company dropdown is preselected', () => {
    expect(mockEmployeesClient.getManagersForCompanyId).toHaveBeenCalledWith('1');
    expect(mockDepartmentsClient.getDepartmentsByCompanyId).toHaveBeenCalledWith('1');
  });
});
