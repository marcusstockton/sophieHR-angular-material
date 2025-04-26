import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { CompanyFormComponent } from './forms/company-form/company-form.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyLogoDialogComponent } from './dialogs/company-logo-dialog/company-logo-dialog.component';
import { RouterModule } from '@angular/router';
import { CompanyConfigComponent } from './company-config/company-config.component';
import { CompanyConfigFormComponent } from './forms/company-config-form/company-config-form.component';


@NgModule({
  declarations: [
    CompanyDetailComponent,
    CompanyFormComponent,
    CompanyListComponent,
    CompanyLogoDialogComponent,
    CompanyConfigComponent,
    CompanyConfigFormComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CompanyRoutingModule,
    CompanyRoutingModule,
    RouterModule,
  ],
  exports: [
    CompanyDetailComponent,
    CompanyFormComponent,
  ]
})
export class CompanyModule { }
