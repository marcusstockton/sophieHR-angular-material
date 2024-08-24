import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoteCreateDto, NoteDetailDto, NotesClient } from 'src/app/client';

@Component({
  selector: 'app-note-form-dialog',
  templateUrl: './note-form-dialog.component.html',
  styleUrls: ['./note-form-dialog.component.scss']
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
    // console.log(this.form.getRawValue());

    if (this.noteData.id) {
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
        (success) => {
          this.dialogRef.close({ data: "updated" });
        }, (error) => {
          this.submitted = false;

        })
      // edit
    } else {
      // create
      var noteCreate: NoteCreateDto = { ...this.form.value };
      this.notesClient.postNotes(this.data.employeeId, noteCreate).subscribe(
        (success) => {
          this.dialogRef.close({ data: "created" });
        }, (error) => {
          this.submitted = false;
        })
    }
  }

}
