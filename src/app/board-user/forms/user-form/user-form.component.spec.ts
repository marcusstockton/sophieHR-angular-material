import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CompaniesClient, DepartmentsClient, EmployeesClient, KeyValuePairOfGuidAndString } from 'src/app/client';

import { UserFormComponent } from './user-form.component';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async () => {
    const mockEmployeesClient = jasmine.createSpyObj('EmployeesClient', ['getTitles','getEmployee', 'getManagersForCompanyId', 'postEmployee'])
    mockEmployeesClient.getTitles.and.returnValue(of(["Mr", "Mrs", "Sir"]))

    const mockCompaniesClient = jasmine.createSpyObj('CompaniesClient', ['getCompanyNames'])
    const companyList: KeyValuePairOfGuidAndString[] = [
      new KeyValuePairOfGuidAndString({key: "1", value: "Test"})
    ] 
    mockCompaniesClient.getCompanyNames.and.returnValue(of(companyList))

    const mockDepartmentsClient = jasmine.createSpyObj('DepartmentsClient', ['getDepartmentsByCompanyId'])

    await TestBed.configureTestingModule({
      declarations: [ UserFormComponent ],
      imports:[RouterTestingModule],
      providers:[
        FormBuilder,
        { provide: EmployeesClient, useValue: mockEmployeesClient },
        { provide: CompaniesClient, useValue: mockCompaniesClient },
        { provide: DepartmentsClient, useValue: mockDepartmentsClient },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null, } } } },

      ]
    })
    .compileComponents();
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
