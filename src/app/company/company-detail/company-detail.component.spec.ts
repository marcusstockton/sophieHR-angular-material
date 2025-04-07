import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompaniesClient, CompanyDetailDto } from 'src/app/client';
import { CompanyDetailComponent } from './company-detail.component';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('CompanyDetailComponent', () => {
  let component: CompanyDetailComponent;
  let fixture: ComponentFixture<CompanyDetailComponent>;
  let mockCompaniesClient: jasmine.SpyObj<CompaniesClient>;

  beforeEach(async () => {
    mockCompaniesClient = jasmine.createSpyObj('CompaniesClient', ['getCompany']);

    // Ensure getCompany returns an observable
    mockCompaniesClient.getCompany.and.returnValue(of({ id: '123', name: 'Test Company' } as CompanyDetailDto));

    await TestBed.configureTestingModule({
      declarations: [CompanyDetailComponent],
      imports: [RouterModule.forRoot([])],
      providers: [
        { provide: CompaniesClient, useValue: mockCompaniesClient },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ companyid: '123' })
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set companyId from route params', () => {
    expect(component.companyId).toBe('123');
  });

  it('should call getCompanyDetails on init', () => {
    spyOn(component, 'getCompanyDetails').and.callThrough();
    component.ngOnInit();
    expect(component.getCompanyDetails).toHaveBeenCalledWith('123');
  });

  it('should set company on successful getCompany', () => {
    const mockCompanyDetail = { id: '123', name: 'Test Company' } as CompanyDetailDto;
    mockCompaniesClient.getCompany.and.returnValue(of(mockCompanyDetail));

    component.getCompanyDetails('123');

    expect(component.company).toEqual(mockCompanyDetail);
  });

  it('should navigate to edit company on editCompany call', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.editCompany('123');
    expect(routerSpy).toHaveBeenCalledWith(['/company/123/edit', { companyid: '123' }]);
  });
});
