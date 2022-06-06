import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptCreateDialogComponent } from './dept-create-dialog.component';

describe('DeptCreateDialogComponent', () => {
  let component: DeptCreateDialogComponent;
  let fixture: ComponentFixture<DeptCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptCreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
