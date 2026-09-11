import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideRouter, Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { CompaniesClient } from 'src/app/client';

import { CompanyListComponent } from './company-list.component';
import { MaterialModule } from 'src/app/material/material.module';

describe('CompanyListComponent', () => {
  let component: CompanyListComponent;
  let fixture: ComponentFixture<CompanyListComponent>;
  let mockCompaniesClient: jasmine.SpyObj<CompaniesClient>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    mockCompaniesClient = jasmine.createSpyObj('CompaniesClient', ['getCompanies']);
    mockCompaniesClient.getCompanies.and.returnValue(of([]));

    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [MaterialModule, RouterModule],
      declarations: [CompanyListComponent],
      providers: [
        provideRouter([]),
        { provide: CompaniesClient, useValue: mockCompaniesClient },
        { provide: MatSnackBar, useValue: mockSnackBar },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should request the company list on init and stop the loading state on completion', () => {
    expect(mockCompaniesClient.getCompanies).toHaveBeenCalled();
    expect(component.isLoading).toBeFalse();
    expect(component.dataSource.data).toEqual([]);
  });

  it('should navigate to the company details route when the user selects a row', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    const company = { id: 'company-1', name: 'Test Company' } as any;
    component.companyDetails(company);

    expect(router.navigate).toHaveBeenCalledWith(['/company/company-1']);
  });
});
