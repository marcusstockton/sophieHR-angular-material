import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { EmployeeDetailDto, EmployeesClient } from '../client';

import { BoardUserComponent } from './board-user.component';

describe('BoardUserComponent', () => {
  let component: BoardUserComponent;
  let fixture: ComponentFixture<BoardUserComponent>;

  beforeEach(async () => {

    const employee = new EmployeeDetailDto({
      id: "1",
      title: "Tester"
    })

    const mockEmployeesClient = jasmine.createSpyObj('EmployeesClient', ['getEmployee'])
    mockEmployeesClient.getEmployee.and.returnValue(of(employee));

    const mockDomSanitizer = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustUrl'])

    await TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      declarations: [BoardUserComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null, } } } },
        { provide: EmployeesClient, useValue: mockEmployeesClient },
        { provide: DomSanitizer, useValue: mockDomSanitizer },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.loading).toBeFalse();
  });
});
