import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { CompanyFormComponent } from './forms/company-form/company-form.component';
import { CompanyListComponent } from './company-list/company-list.component';



@NgModule({
  declarations: [
    CompanyDetailComponent,
    CompanyFormComponent,
    CompanyListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CompanyRoutingModule
  ],
  exports:[
    CompanyDetailComponent,
    CompanyFormComponent
  ]
})
export class CompanyModule { }
