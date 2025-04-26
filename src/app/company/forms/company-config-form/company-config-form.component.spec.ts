import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyConfigFormComponent } from './company-config-form.component';

describe('CompanyConfigFormComponent', () => {
  let component: CompanyConfigFormComponent;
  let fixture: ComponentFixture<CompanyConfigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyConfigFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
