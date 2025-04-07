import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyLogoDialogComponent } from './company-logo-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompaniesClient, FileResponse } from 'src/app/client'; // Import the CompaniesClient
import { of } from 'rxjs';

describe('CompanyLogoDialogComponent', () => {
  let component: CompanyLogoDialogComponent;
  let fixture: ComponentFixture<CompanyLogoDialogComponent>;
  let mockCompaniesClient: jasmine.SpyObj<CompaniesClient>;

  beforeEach(() => {
    // Mock CompaniesClient
    mockCompaniesClient = jasmine.createSpyObj('CompaniesClient', ['uploadLogo']);
    mockCompaniesClient.uploadLogo.and.returnValue(of({ data: new Blob(), status: 200 } as FileResponse)); // Mock the uploadLogo method to return a valid FileResponse

    TestBed.configureTestingModule({
      declarations: [CompanyLogoDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} }, // Mock MAT_DIALOG_DATA
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } }, // Mock MatDialogRef
        { provide: CompaniesClient, useValue: mockCompaniesClient } // Provide the mocked CompaniesClient
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
