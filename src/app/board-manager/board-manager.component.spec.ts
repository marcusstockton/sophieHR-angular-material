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
    const mockCompaniesClient = jasmine.createSpyObj('CompaniesClient', ['getCompany'])
    mockCompaniesClient.getCompany.and.returnValue(of(new CompanyDetailDto({id: "1", name: "Test" })))

    const mockTokenStorageService = jasmine.createSpyObj('TokenStorageService',['getUser'])
    mockTokenStorageService.getUser.and.returnValue(of({'companyId': 1, 'id': 1}));

    const mockEmployeesClient = jasmine.createSpyObj('EmployeesClient', ['getEmployeesForManager'])

    var employees: EmployeeListDto[] = [
      new EmployeeListDto({id: '1'}),
      new EmployeeListDto({id: '2'})
    ]
    mockEmployeesClient.getEmployeesForManager.and.returnValue(of(employees))

    await TestBed.configureTestingModule({
      declarations: [ BoardManagerComponent ],
      imports:[RouterTestingModule],
      providers:[
        { provide: CompaniesClient, useValue: mockCompaniesClient },
        { provide: TokenStorageService, useValue: mockTokenStorageService},
        { provide: EmployeesClient, useValue: mockEmployeesClient },
      ]
    })
    .compileComponents();
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
