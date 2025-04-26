import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { AuthGuard } from '../_helpers/auth.guard';
import { CompanyFormComponent } from './forms/company-form/company-form.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyConfigComponent } from './company-config/company-config.component';
import { CompanyConfigFormComponent } from './forms/company-config-form/company-config-form.component';

const routes: Routes = [
  { path: 'list', component: CompanyListComponent, canActivate: [AuthGuard] },
  { path: 'create', component: CompanyFormComponent, canActivate: [AuthGuard] },
  { path: ':companyid', component: CompanyDetailComponent, canActivate: [AuthGuard] },
  { path: ':companyid/edit', component: CompanyFormComponent, canActivate: [AuthGuard] },
  { path: ':companyid/config', component: CompanyConfigComponent, canActivate: [AuthGuard] },
  { path: ':companyid/config/edit', component: CompanyConfigFormComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
