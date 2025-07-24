import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardManagerComponent } from './board-manager/board-manager.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_helpers/auth.guard';
import { AccountClient, CompaniesClient, CompanyConfigClient, DepartmentsClient, EmployeesClient, LeaveRequestsClient, NotesClient } from './client';
import { environment } from 'src/environments/environment';
import { D } from 'node_modules/@angular/cdk/bidi-module.d-IN1Vp56w';
import { DepartmentsComponent } from './departments/departments.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'user', canActivate: [AuthGuard],
    loadChildren: () => import('./board-user/board-user.module').then(m => m.BoardUserModule),
  },
  { path: 'manager', component: BoardManagerComponent, canActivate: [AuthGuard] },
  {
    path: 'admin', canActivate: [AuthGuard],
    loadChildren: () => import('./board-admin/board-admin.module').then(m => m.BoardAdminModule),
  },
  {
    path: 'company', canActivate: [AuthGuard],
    loadChildren: () => import('./company/company.module').then(m => m.CompanyModule),
  },
  {
    path: 'departments', canActivate: [AuthGuard], component: DepartmentsComponent,
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: !environment.production })],
  exports: [RouterModule],
  providers: [CompaniesClient, EmployeesClient, AccountClient, DepartmentsClient, NotesClient, LeaveRequestsClient, CompanyConfigClient]
})
export class AppRoutingModule { }
