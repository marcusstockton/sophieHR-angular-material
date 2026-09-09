import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { timeout } from 'rxjs';
import { NoteDetailDto, NotesClient, NoteType } from 'src/app/client';
import { NoteFormDialogComponent } from 'src/app/dialogs/notes/note-form-dialog/note-form-dialog.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  standalone: false
})
export class NotesComponent implements OnChanges {

  notes = signal<NoteDetailDto[]>([]);
  isLoading = false;
  loadError = false;
  private requestedEmployeeId: string | undefined;

  constructor(
    readonly dialog: MatDialog,
    private notesClient: NotesClient) { }
  @Input() employeeId: string | undefined;
  @Output() noteChangedEvent = new EventEmitter<boolean>();

  ngOnChanges(changes: SimpleChanges): void {
    const employeeId = changes['employeeId']?.currentValue;
    if (employeeId != null && employeeId !== this.requestedEmployeeId) {
      this.requestedEmployeeId = employeeId;
      this.getEmployeeNotes(employeeId);
    }
  }

  public openNoteDialog(note: any) {
    const dialogRef = this.dialog.open(NoteFormDialogComponent, { width: '600px', data: { note, employeeId: this.employeeId } });
    dialogRef.afterClosed().subscribe({
      next: (res: any) => {
        if (res.data === 'created' || res.data === 'updated' || res.data == "deleted") {
          this.getEmployeeNotes(this.employeeId);
        }
      },
      error: () => { },
    });
  };

  getEmployeeNotes(employeeId: any) {
    console.log('Fetching notes for employeeId:', employeeId);
    if (employeeId == null) {
      this.isLoading = false;
      this.loadError = true;
      return;
    }

    this.isLoading = true;
    this.loadError = false;
    try {
      this.notesClient.getNotesForEmployee(employeeId).pipe(timeout(10000)).subscribe({
        next: (result: NoteDetailDto[]) => {
          const sortedNotes = (result ?? []).sort((a, b) =>
            new Date(b.createdDate!).getTime() - new Date(a.createdDate!).getTime());
          this.notes.set(sortedNotes);
          console.log('Notes loaded:', sortedNotes.length);
          this.isLoading = false;
        },
        error: () => {
          this.notes.set([]);
          this.isLoading = false;
          this.loadError = true;
        }
      });
    } catch {
      this.notes.set([]);
      this.isLoading = false;
      this.loadError = true;
    }
  }

  getNoteTypeNameByValue(value: number) {
    return NoteType[value];
  }

}
