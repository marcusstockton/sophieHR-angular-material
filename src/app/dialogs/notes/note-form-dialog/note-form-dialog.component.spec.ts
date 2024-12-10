import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteFormDialogComponent } from './note-form-dialog.component';
import { NotesClient } from 'src/app/client';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('NoteFormDialogComponent', () => {
  let component: NoteFormDialogComponent;
  let fixture: ComponentFixture<NoteFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteFormDialogComponent],
      providers: [NotesClient, provideHttpClient(withFetch()),
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NoteFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
