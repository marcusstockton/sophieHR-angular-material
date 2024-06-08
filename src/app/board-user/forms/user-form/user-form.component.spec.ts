import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CompaniesClient, DepartmentsClient, EmployeesClient, KeyValuePairOfGuidAndString } from 'src/app/client';

import { UserFormComponent } from './user-form.component';
import { BoardUserModule } from '../../board-user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

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
    declarations: [UserFormComponent],
    imports: [RouterTestingModule, BrowserAnimationsModule, BoardUserModule],
    providers: [
        UntypedFormBuilder,
        { provide: EmployeesClient, useValue: mockEmployeesClient },
        { provide: CompaniesClient, useValue: mockCompaniesClient },
        { provide: DepartmentsClient, useValue: mockDepartmentsClient },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null, } } } },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
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
