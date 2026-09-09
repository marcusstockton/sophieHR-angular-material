import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CompanyConfigClient } from '../../client';

import { CompanyConfigComponent } from './company-config.component';

describe('CompanyConfigComponent', () => {
  let component: CompanyConfigComponent;
  let fixture: ComponentFixture<CompanyConfigComponent>;

  beforeEach(async () => {
    const mockCompanyConfigClient = jasmine.createSpyObj('CompanyConfigClient', ['getCompanyConfig']);
    mockCompanyConfigClient.getCompanyConfig.and.returnValue(of({}));

    const mockLocation = jasmine.createSpyObj('Location', ['back']);
    const mockActivatedRoute = {
      params: of({ companyid: '1' })
    };

    await TestBed.configureTestingModule({
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
});
