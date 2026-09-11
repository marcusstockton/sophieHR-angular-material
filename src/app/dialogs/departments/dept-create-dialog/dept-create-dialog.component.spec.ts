import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepartmentsClient } from 'src/app/client';

import { DeptCreateDialogComponent } from './dept-create-dialog.component';
import { MaterialModule } from 'src/app/material/material.module';

describe('DeptCreateDialogComponent', () => {
  let component: DeptCreateDialogComponent;
  let fixture: ComponentFixture<DeptCreateDialogComponent>;

  beforeEach(async () => {

    const mockMatSnackBar = jasmine.createSpy('MatSnackBar');
    const mockDepartmentsClient = jasmine.createSpyObj('DepartmentsClient', ['postDepartment'])
    const dto: any = { companyId: "1" };

    await TestBed.configureTestingModule({
      imports: [MaterialModule, ReactiveFormsModule],
      declarations: [DeptCreateDialogComponent],
      providers: [
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
