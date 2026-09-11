import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { NoteFormDialogComponent } from './note-form-dialog.component';
import { NotesClient } from 'src/app/client';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('NoteFormDialogComponent', () => {
  let component: NoteFormDialogComponent;
  let fixture: ComponentFixture<NoteFormDialogComponent>;
  let mockNotesClient: jasmine.SpyObj<NotesClient>;

  beforeEach(async () => {
    mockNotesClient = jasmine.createSpyObj('NotesClient', ['getNoteTypes', 'putNotes', 'postNotes', 'deleteNotes']);
    mockNotesClient.getNoteTypes.and.returnValue(of({}));
    mockNotesClient.putNotes.and.returnValue(of(undefined));
    mockNotesClient.postNotes.and.returnValue(of({} as any));
    mockNotesClient.deleteNotes.and.returnValue(of(undefined));

    await TestBed.configureTestingModule({
      imports: [MaterialModule, ReactiveFormsModule],
      declarations: [NoteFormDialogComponent],
      providers: [
        { provide: NotesClient, useValue: mockNotesClient },
        { provide: MAT_DIALOG_DATA, useValue: { note: null, employeeId: '1' } },
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MatSnackBar, useValue: { open: jasmine.createSpy('open') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NoteFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
