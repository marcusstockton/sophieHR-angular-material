import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFormComponent } from './company-form.component';
import { RouterModule } from '@angular/router';
import { CompaniesClient } from 'src/app/client';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MatAutocomplete } from '@angular/material/autocomplete';

describe('CompanyFormComponent', () => {
  let component: CompanyFormComponent;
  let fixture: ComponentFixture<CompanyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyFormComponent],
      imports: [RouterModule.forRoot([]), MatAutocomplete],
      providers: [CompaniesClient, provideHttpClient(withFetch())]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CompanyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
