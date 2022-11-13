import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardUserComponent } from './board-user.component';
import { UserFormComponent } from './forms/user-form/user-form.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardUserRoutingModule } from './board-user-routing.module';
import { NoteFormDialogComponent } from '../dialogs/notes/note-form-dialog/note-form-dialog.component';
import { NotesComponent } from './components/notes/notes.component';
import { LeaveListComponent } from './components/leave-list/leave-list.component';
import { LeaveRequestFormComponent } from './dialogs/leave/leave-request-form/leave-request-form.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';



@NgModule({
  declarations: [
    BoardUserComponent,
    UserFormComponent,
    NoteFormDialogComponent,
    NotesComponent,
    LeaveListComponent,
    LeaveRequestFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BoardUserRoutingModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
})
export class BoardUserModule { }
