import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { DepartmentsClient } from '../client';
import { TokenStorageService } from '../_services/token-storage.service';

import { DepartmentsComponent } from './departments.component';

describe('DepartmentsComponent', () => {
  let component: DepartmentsComponent;
  let fixture: ComponentFixture<DepartmentsComponent>;

  beforeEach(async () => {
    const mockDepartmentClient = jasmine.createSpyObj('DepartmentsClient', ['getDepartmentsByCompanyId']);
    mockDepartmentClient.getDepartmentsByCompanyId.and.returnValue(of([]));

    const mockTokenStorageService = jasmine.createSpyObj('TokenStorageService', ['getUser']);
    mockTokenStorageService.getUser.and.returnValue({ companyId: '1' });

    const mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    const mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockDialog.open.and.returnValue({ afterClosed: () => of(null) });

    await TestBed.configureTestingModule({
      imports: [DepartmentsComponent],
      providers: [
        { provide: DepartmentsClient, useValue: mockDepartmentClient },
        { provide: TokenStorageService, useValue: mockTokenStorageService },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: MatDialog, useValue: mockDialog },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
