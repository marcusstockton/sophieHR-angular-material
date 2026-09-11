import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { CompanyConfigClient } from '../../client';

import { CompanyConfigComponent } from './company-config.component';
import { MaterialModule } from 'src/app/material/material.module';

describe('CompanyConfigComponent', () => {
  let component: CompanyConfigComponent;
  let fixture: ComponentFixture<CompanyConfigComponent>;
  let mockCompanyConfigClient: jasmine.SpyObj<CompanyConfigClient>;
  let mockLocation: jasmine.SpyObj<Location>;

  beforeEach(async () => {
    mockCompanyConfigClient = jasmine.createSpyObj('CompanyConfigClient', ['getCompanyConfig']);
    mockCompanyConfigClient.getCompanyConfig.and.returnValue(of({}));

    mockLocation = jasmine.createSpyObj('Location', ['back']);
    const mockActivatedRoute = {
      params: of({ companyid: '1' })
    };

    await TestBed.configureTestingModule({
      imports: [MaterialModule, RouterModule],
      declarations: [CompanyConfigComponent],
      providers: [
        { provide: Location, useValue: mockLocation },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: CompanyConfigClient, useValue: mockCompanyConfigClient },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the company configuration from the route company id', () => {
    expect(mockCompanyConfigClient.getCompanyConfig).toHaveBeenCalledWith('1');
    expect(component.companyConfig).toEqual({});
  });

  it('should delegate the browser back action through Location', () => {
    component.back();
    expect(mockLocation.back).toHaveBeenCalled();
  });
});
