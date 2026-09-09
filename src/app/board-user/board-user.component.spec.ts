import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { EmployeeDetailDto, EmployeesClient } from '../client';

import { BoardUserComponent } from './board-user.component';

describe('BoardUserComponent', () => {
  let component: BoardUserComponent;
  let fixture: ComponentFixture<BoardUserComponent>;

  beforeEach(async () => {
    const employee: EmployeeDetailDto = {
      id: '1',
      title: 'Tester'
    };

    const mockEmployeesClient = jasmine.createSpyObj('EmployeesClient', ['getEmployee']);
    mockEmployeesClient.getEmployee.and.returnValue(of(employee));

    const mockDomSanitizer = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustUrl']);

    await TestBed.configureTestingModule({
      declarations: [BoardUserComponent],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({})) } },
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
