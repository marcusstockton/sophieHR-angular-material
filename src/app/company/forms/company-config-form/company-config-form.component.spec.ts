import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyConfigFormComponent } from './company-config-form.component';

describe('CompanyConfigFormComponent', () => {
  let component: CompanyConfigFormComponent;
  let fixture: ComponentFixture<CompanyConfigFormComponent>;

  beforeEach(async () => {
    const mockLocation = jasmine.createSpyObj('Location', ['back']);

    await TestBed.configureTestingModule({
      declarations: [CompanyConfigFormComponent],
      providers: [
        { provide: Location, useValue: mockLocation },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
