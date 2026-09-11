import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { LeaveRequestFormComponent } from './leave-request-form.component';
import { LeaveRequestsClient } from 'src/app/client';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

describe('LeaveRequestFormComponent', () => {
  let component: LeaveRequestFormComponent;
  let fixture: ComponentFixture<LeaveRequestFormComponent>;
  let mockLeaveRequestsClient: jasmine.SpyObj<LeaveRequestsClient>;

  beforeEach(async () => {
    mockLeaveRequestsClient = jasmine.createSpyObj('LeaveRequestsClient', ['getLeaveTypes', 'postLeaveRequest']);
    mockLeaveRequestsClient.getLeaveTypes.and.returnValue(of({}));
    mockLeaveRequestsClient.postLeaveRequest.and.returnValue(of({} as any));

    await TestBed.configureTestingModule({
      imports: [MaterialModule, MatDialogModule, ReactiveFormsModule],
      declarations: [LeaveRequestFormComponent],
      providers: [
        { provide: LeaveRequestsClient, useValue: mockLeaveRequestsClient },
        { provide: MAT_DIALOG_DATA, useValue: { employeeId: '1' } },
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LeaveRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
