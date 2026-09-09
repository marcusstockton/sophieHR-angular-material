import { Component, signal } from '@angular/core';
import { DepartmentDetailDto, DepartmentsClient, UserTokens } from '../client';
import { TokenStorageService } from '../_services/token-storage.service';
import { MaterialModule } from '../material/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatDialog } from '@angular/material/dialog';
import { DeptCreateDialogComponent } from '../dialogs/departments/dept-create-dialog/dept-create-dialog.component';

@Component({
  selector: 'app-departments',
  imports: [MaterialModule],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss',
  standalone: true,
})
export class DepartmentsComponent {

  departments = signal<DepartmentDetailDto[]>([]);
  user: UserTokens | null = null;

  constructor(
    private departmentClient: DepartmentsClient,
    private tokenStorageService: TokenStorageService,
    private _snackBar: MatSnackBar,
    readonly dialog: MatDialog,
  ) {

    this.user = this.tokenStorageService.getUser();

    this.getDepartments();

  }

  private getDepartments() {
    console.log('Fetching departments for companyId:', this.user?.companyId);
    this.departmentClient.getDepartmentsByCompanyId(this.user?.companyId!).subscribe({
      next: (departments: DepartmentDetailDto[]) => {
        this.departments.set(departments ?? []);
      },
      error: (error) => {
        console.error('Error fetching departments:', error);
        this._snackBar.open('Error fetching departments: ' + error.message, "Ok", { duration: 5000, panelClass: ['error-snackbar'] });
      }
    });
  }


  public openAddDepartmentDialog() {
    const dialogRef = this.dialog.open(DeptCreateDialogComponent, { width: '600px', data: { companyId: this.user?.companyId } });
    dialogRef.afterClosed().subscribe({
      next: (res: any) => {
        if (res) {
          this.getDepartments();
        }
      },
      error: () => { },
    });
  };

}
