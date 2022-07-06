import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardUserComponent } from './board-user.component';
import { UserFormComponent } from './forms/user-form/user-form.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardUserRoutingModule } from './board-user-routing.module';



@NgModule({
  declarations: [
    BoardUserComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BoardUserRoutingModule
  ]
})
export class BoardUserModule { }
