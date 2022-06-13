import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
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

    await TestBed.configureTestingModule({
      declarations: [BoardUserComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null, } } } },
        { provide: EmployeesClient, useValue: mockEmployeesClient },
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
