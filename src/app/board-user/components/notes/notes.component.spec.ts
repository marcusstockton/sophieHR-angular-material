import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { NotesComponent } from './notes.component';
import { NotesClient } from 'src/app/client';
import { MaterialModule } from 'src/app/material/material.module';
import { MatDialog } from '@angular/material/dialog';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;
  let mockNotesClient: jasmine.SpyObj<NotesClient>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockNotesClient = jasmine.createSpyObj('NotesClient', ['getNotesForEmployee']);
    mockNotesClient.getNotesForEmployee.and.returnValue(of([]));

    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockMatDialog.open.and.returnValue({
      afterClosed: () => of({ data: 'created' })
    } as any);

    await TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [NotesComponent],
      providers: [
        { provide: NotesClient, useValue: mockNotesClient },
        { provide: MatDialog, useValue: mockMatDialog }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
