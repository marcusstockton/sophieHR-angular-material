import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteCreateDto, NoteDetailDto, NotesClient } from 'src/app/client';

@Component({
  selector: 'app-note-form-dialog',
  templateUrl: './note-form-dialog.component.html',
  styleUrls: ['./note-form-dialog.component.scss'],
  standalone: false
})
export class NoteFormDialogComponent implements OnInit {

  public noteData: NoteDetailDto;
  public submitted: boolean;
  public noteTypes: { key: string; value: string; }[];

  public form: FormGroup = this.fb.group({
    title: [null, [Validators.required]],
    content: [null, [Validators.required]],
    noteTypeId: [null, [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private readonly notesClient: NotesClient,
    private readonly _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<NoteFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

    this.notesClient.getNoteTypes().subscribe((nts) => {
      this.noteTypes = Object.entries(nts).map(([key, value]) => ({
        key, value
      }));
    });

    if (this.data.note != null) {
      this.noteData = this.data.note;
      this.form.patchValue({
        title: this.noteData.title,
        content: this.noteData.content,
        noteTypeId: this.noteData.noteType?.toString()
      });
    } else {
      this.noteData = {
        content: '',
        title: '',
        noteType: 0
      } as NoteCreateDto;
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.noteData.id) {
      // Edit
      var data = {
        content: this.form.get('content')?.value,
        createdDate: this.noteData.createdDate,
        employeeId: this.noteData.employeeId,
        id: this.noteData.id,
        noteType: Number.parseInt(this.form.get('noteTypeId')?.value),
        title: this.form.get('title')?.value,
        updatedDate: this.noteData.updatedDate
      } as NoteDetailDto;
      this.notesClient.putNotes(this.noteData.id, data).subscribe(
        {
          next: result => {
            this._snackBar.open("Note updated", "OK", { duration: 5000, panelClass: ["success-snackbar"] });
            this.dialogRef.close({ data: "updated" });
          }, error: err => {
            this._snackBar.open(err, "Ok", { duration: 5000, panelClass: ["error-snackbar"] });
            this.submitted = false;
          }
        })
    } else {
      // Create
      var noteCreate: NoteCreateDto = { ...this.form.value };
      this.notesClient.postNotes(this.data.employeeId, noteCreate).subscribe({

        next: res => {
          this._snackBar.open("Note created", "OK", { duration: 5000, panelClass: ["success-snackbar"] });
          this.dialogRef.close({ data: "created" });
        }, error: err => {
          this._snackBar.open(err, "Ok", { duration: 5000, panelClass: ["error-snackbar"] });
          this.submitted = false;
        }
      })
    }
  }

  deleteNote(id: string) {
    this.notesClient.deleteNotes(id).subscribe({
      next: result => {
        this._snackBar.open("Note created", "OK", { duration: 5000, panelClass: ["success-snackbar"] });
        this.dialogRef.close({ data: "deleted" });
      }, error: err => {
        this._snackBar.open(err, "Ok", { duration: 5000, panelClass: ["error-snackbar"] });
        this.submitted = false;
      }
    })
  }

}
