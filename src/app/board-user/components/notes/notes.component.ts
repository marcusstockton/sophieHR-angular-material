import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteDetailDto } from 'src/app/client';
import { NoteFormDialogComponent } from 'src/app/dialogs/notes/note-form-dialog/note-form-dialog.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  constructor(readonly dialog: MatDialog) { }
  @Input() notes: NoteDetailDto[] | undefined;
  @Input() employeeId: string | undefined;

  ngOnInit(): void {
  }


  openNoteDialog(note:any){
    const dialogRef = this.dialog.open(NoteFormDialogComponent, { width: '600px', data: {note, employeeId: this.employeeId}});
  };

}
