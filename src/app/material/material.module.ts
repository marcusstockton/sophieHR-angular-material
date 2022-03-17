import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSliderModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatSnackBarModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  exports: [
    MatSliderModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatSnackBarModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ]
})
export class MaterialModule { }
