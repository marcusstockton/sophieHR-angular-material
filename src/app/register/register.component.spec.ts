import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountClient } from '../client';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    const mockAccountClient = jasmine.createSpyObj('AccountClient', ['registerNewAdminUser'])
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports:[FormsModule, ReactiveFormsModule],
      providers:[
        {provide: AccountClient, useValue: mockAccountClient}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
