import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyLogoDialogComponent } from './company-logo-dialog.component';

describe('CompanyLogoDialogComponent', () => {
  let component: CompanyLogoDialogComponent;
  let fixture: ComponentFixture<CompanyLogoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyLogoDialogComponent]
    });
    fixture = TestBed.createComponent(CompanyLogoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
