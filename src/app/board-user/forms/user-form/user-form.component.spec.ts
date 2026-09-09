import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CompaniesClient, DepartmentsClient, EmployeesClient, KeyValuePairOfGuidAndstring } from 'src/app/client';

import { UserFormComponent } from './user-form.component';
import { BoardUserModule } from '../../board-user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async () => {
    const mockEmployeesClient = jasmine.createSpyObj('EmployeesClient', [
      'getTitles',
      'getRoles',
      'getEmployee',
      'getManagersForCompanyId',
      'postEmployee',
    ]);

    mockEmployeesClient.getTitles.and.returnValue(of(['Mr', 'Mrs', 'Sir']));
    mockEmployeesClient.getRoles.and.returnValue(of(['User', 'Manager', 'Admin']));
    mockEmployeesClient.getManagersForCompanyId.and.returnValue(of([]));

    const mockCompaniesClient = jasmine.createSpyObj('CompaniesClient', ['getCompanyNames']);
    const companyList: KeyValuePairOfGuidAndstring[] = [
      { key: '1', value: 'Test' } as KeyValuePairOfGuidAndstring
    ];
    mockCompaniesClient.getCompanyNames.and.returnValue(of(companyList));

    const mockDepartmentsClient = jasmine.createSpyObj('DepartmentsClient', ['getDepartmentsByCompanyId']);
    mockDepartmentsClient.getDepartmentsByCompanyId.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [UserFormComponent],
      imports: [RouterTestingModule, BrowserAnimationsModule, BoardUserModule],
      providers: [
        UntypedFormBuilder,
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
});
