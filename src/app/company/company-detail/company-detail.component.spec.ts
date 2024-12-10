import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompaniesClient } from 'src/app/client';

import { CompanyDetailComponent } from './company-detail.component';
import { RouterModule } from '@angular/router';

describe('CompanyDetailComponent', () => {
  let component: CompanyDetailComponent;
  let fixture: ComponentFixture<CompanyDetailComponent>;

  beforeEach(async () => {
    const mockCompaniesClient = jasmine.createSpyObj('CompaniesClient', ['getCompany'])

    await TestBed.configureTestingModule({
      declarations: [CompanyDetailComponent],
      imports: [RouterModule.forRoot([])],
      providers: [
        { provide: CompaniesClient, useValue: mockCompaniesClient },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
