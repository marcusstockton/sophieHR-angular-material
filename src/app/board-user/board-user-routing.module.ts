import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_helpers/auth.guard';
import { BoardUserComponent } from './board-user.component';
import { UserFormComponent } from './forms/user-form/user-form.component';


const routes: Routes = [
    { path: '', component: BoardUserComponent, canActivate: [AuthGuard] },
    { path: 'add', component: UserFormComponent, canActivate: [AuthGuard] },
    { path: ':userid', component: BoardUserComponent, canActivate: [AuthGuard] },
    { path: ':userid/edit', component: UserFormComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardUserRoutingModule { }