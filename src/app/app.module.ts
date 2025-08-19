import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardManagerComponent } from './board-manager/board-manager.component';
import { AuthInterceptor } from './_helpers/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { DeptCreateDialogComponent } from './dialogs/departments/dept-create-dialog/dept-create-dialog.component';
import { BoardUserModule } from './board-user/board-user.module';
import { CompanyModule } from './company/company.module';
import { BoardAdminModule } from './board-admin/board-admin.module';
import { HttpErrorInterceptor } from './_helpers/http-error.interceptor';
import { MapComponent } from "./address/map/map.component";


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        ProfileComponent,
        BoardManagerComponent,
        DeptCreateDialogComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        BoardUserModule,
        CompanyModule,
        BoardAdminModule, MapComponent], providers: [
            {
                provide: HTTP_INTERCEPTORS,
                useClass: AuthInterceptor,
                multi: true
            },
            {
                provide: HTTP_INTERCEPTORS,
                useClass: HttpErrorInterceptor,
                multi: true
            },
            provideHttpClient(withInterceptorsFromDi()),
        ]
})
export class AppModule { }
