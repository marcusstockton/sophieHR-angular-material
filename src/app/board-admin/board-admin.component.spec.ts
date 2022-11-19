import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { CompaniesClient, DepartmentsClient, EmployeesClient } from '../client';

import { BoardAdminComponent } from './board-admin.component';

describe('BoardAdminComponent', () => {
  let component: BoardAdminComponent;
  let fixture: ComponentFixture<BoardAdminComponent>;

  beforeEach(async () => {
    const mockCompaniesClient = jasmine.createSpyObj('CompaniesClient', ['getCompany'])
    const mockEmployeesClient = jasmine.createSpyObj('EmployeesClient', ['getEmployeesForCompanyId'])
    const mockDepartmentsClient = jasmine.createSpyObj('DepartmentsClient', ['getDepartmentsByCompanyId'])

    await TestBed.configureTestingModule({
      declarations: [ BoardAdminComponent ], 
      imports:[RouterTestingModule],
      providers:[
        { provide: CompaniesClient, useValue: mockCompaniesClient },
        { provide: EmployeesClient, useValue: mockEmployeesClient },
        { provide: EmployeesClient, useValue: mockEmployeesClient },
        { provide: DepartmentsClient, useValue: mockDepartmentsClient },
        { provide: MatDialog, useValue: {} },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
