import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CompanyFormComponent } from './company-form.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CompaniesClient } from 'src/app/client';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

describe('CompanyFormComponent', () => {
  let component: CompanyFormComponent;
  let fixture: ComponentFixture<CompanyFormComponent>;
  let mockCompaniesClient: jasmine.SpyObj<CompaniesClient>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockLocation: jasmine.SpyObj<Location>;

  beforeEach(async () => {
    mockCompaniesClient = jasmine.createSpyObj('CompaniesClient', [
      'getCompany',
      'postcodeLookup',
      'postcodeAutoComplete',
      'putCompany',
      'postCompany'
    ]);
    mockCompaniesClient.getCompany.and.returnValue(of({} as any));
    mockCompaniesClient.postcodeLookup.and.returnValue(of({ result: { admin_county: 'Test County', latitude: 0, longitude: 0 } } as any));
    mockCompaniesClient.postcodeAutoComplete.and.returnValue(of([]));
    mockCompaniesClient.putCompany.and.returnValue(of({} as any));
    mockCompaniesClient.postCompany.and.returnValue(of({} as any));

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockLocation = jasmine.createSpyObj('Location', ['back']);

    await TestBed.configureTestingModule({
      declarations: [CompanyFormComponent],
      imports: [RouterModule.forRoot([]), MaterialModule, ReactiveFormsModule],
      providers: [
        { provide: CompaniesClient, useValue: mockCompaniesClient },
        { provide: ActivatedRoute, useValue: { params: of({}) } },
        { provide: Router, useValue: mockRouter },
        { provide: Location, useValue: mockLocation },
        { provide: MatSnackBar, useValue: { open: jasmine.createSpy('open') } },
        { provide: MatDialog, useValue: { open: jasmine.createSpy('open') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
