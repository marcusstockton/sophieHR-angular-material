import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRequestFormComponent } from './leave-request-form.component';
import { LeaveRequestsClient } from 'src/app/client';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('LeaveRequestFormComponent', () => {
  let component: LeaveRequestFormComponent;
  let fixture: ComponentFixture<LeaveRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaveRequestFormComponent],
      providers: [LeaveRequestsClient, provideHttpClient(withFetch()),
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
      imports: [MatDialogModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LeaveRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
