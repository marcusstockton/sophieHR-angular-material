import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyLogoDialogComponent } from './company-logo-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompaniesClient } from 'src/app/client';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';

describe('CompanyLogoDialogComponent', () => {
  let component: CompanyLogoDialogComponent;
  let fixture: ComponentFixture<CompanyLogoDialogComponent>;
  let mockCompaniesClient: jasmine.SpyObj<CompaniesClient>;

  beforeEach(() => {
    mockCompaniesClient = jasmine.createSpyObj('CompaniesClient', ['uploadLogo']);
    mockCompaniesClient.uploadLogo.and.returnValue(of(undefined));

    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [CompanyLogoDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: CompaniesClient, useValue: mockCompaniesClient }
      ]
    });
    fixture = TestBed.createComponent(CompanyLogoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
