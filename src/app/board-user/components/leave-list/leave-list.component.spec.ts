import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { LeaveRequestsClient } from 'src/app/client';

import { LeaveListComponent } from './leave-list.component';

describe('LeaveListComponent', () => {
  let component: LeaveListComponent;
  let fixture: ComponentFixture<LeaveListComponent>;

  beforeEach(async () => {
    const mockLeaveRequestsClient = jasmine.createSpyObj('LeaveRequestsClient', ['getLeaveRequestsForEmployee']);
    mockLeaveRequestsClient.getLeaveRequestsForEmployee.and.returnValue(of([]));

    const mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockMatDialog.open.and.returnValue({ afterClosed: () => of(null) });

    await TestBed.configureTestingModule({
      declarations: [LeaveListComponent],
      providers: [
        { provide: LeaveRequestsClient, useValue: mockLeaveRequestsClient },
        { provide: MatDialog, useValue: mockMatDialog },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
