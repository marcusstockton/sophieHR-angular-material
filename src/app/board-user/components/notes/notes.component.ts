import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteDetailDto, NotesClient, NoteType } from 'src/app/client';
import { NoteFormDialogComponent } from 'src/app/dialogs/notes/note-form-dialog/note-form-dialog.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes: NoteDetailDto[] = [];

  constructor(readonly dialog: MatDialog, private notesClient: NotesClient) { }
  @Input() employeeId: string | undefined;
  @Output() noteChangedEvent = new EventEmitter<boolean>();

  ngOnInit(): void {
    if (this.employeeId != null) {
      this.getEmployeeNotes(this.employeeId);
    }
  }

  public openNoteDialog(note: any) {
    // console.log("Open Note Dialog hit");
    const dialogRef = this.dialog.open(NoteFormDialogComponent, { width: '600px', data: { note, employeeId: this.employeeId } });
    dialogRef.afterClosed().subscribe({
      next: (res: any) => {
        if (res.data === 'created' || res.data === 'updated') {
          this.getEmployeeNotes(this.employeeId);
        }
      },
      error: () => { },
    });
  };

  getEmployeeNotes(employeeId: any) {
    this.notesClient.getNotesForEmployee(employeeId).subscribe({
      next: (result: NoteDetailDto[]) => {
        this.notes = result?.sort((a, b) => b!.createdDate!.getTime() - a!.createdDate!.getTime());
      }
    });
  }

  getNoteTypeNameByValue(value: number) {
    return NoteType[value];
  }

}
