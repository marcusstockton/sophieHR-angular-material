import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepartmentsClient } from 'src/app/client';

import { DeptCreateDialogComponent } from './dept-create-dialog.component';

describe('DeptCreateDialogComponent', () => {
  let component: DeptCreateDialogComponent;
  let fixture: ComponentFixture<DeptCreateDialogComponent>;

  beforeEach(async () => {

    const mockMatSnackBar = jasmine.createSpy('MatSnackBar');
    const mockDepartmentsClient = jasmine.createSpyObj('DepartmentsClient', ['postDepartment'])
    const dto: any = {companyId: "1"};

    await TestBed.configureTestingModule({
      declarations: [ DeptCreateDialogComponent ],
      providers:[
        UntypedFormBuilder,
        { provide: MatSnackBar, useValue: mockMatSnackBar },
        { provide: DepartmentsClient, useValue: mockDepartmentsClient },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: dto }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
