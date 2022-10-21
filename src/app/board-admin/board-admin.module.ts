import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardAdminRoutingModule } from './board-admin-routing.module';
import { BoardAdminComponent } from './board-admin.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyModule } from '../company/company.module';


@NgModule({
  declarations: [
    BoardAdminComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CompanyModule,
    BoardAdminRoutingModule
  ]
})
export class BoardAdminModule { }
