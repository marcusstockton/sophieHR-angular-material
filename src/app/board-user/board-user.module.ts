import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardUserComponent } from './board-user.component';
import { UserFormComponent } from './forms/user-form/user-form.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardUserRoutingModule } from './board-user-routing.module';
import { NoteFormDialogComponent } from '../dialogs/notes/note-form-dialog/note-form-dialog.component';



@NgModule({
  declarations: [
    BoardUserComponent,
    UserFormComponent,
    NoteFormDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BoardUserRoutingModule
  ]
})
export class BoardUserModule { }
