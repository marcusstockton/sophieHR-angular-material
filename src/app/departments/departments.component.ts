import { Component } from '@angular/core';
import { DepartmentDetailDto, DepartmentsClient, IUserTokens } from '../client';
import { TokenStorageService } from '../_services/token-storage.service';
import { MaterialModule } from '../material/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';
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

  departments: DepartmentDetailDto[] = [];
  user: IUserTokens | null = null;

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
    this.departmentClient.getDepartmentsByCompanyId(this.user?.companyId!).subscribe(departments => {
      this.departments = departments;
    }, error => {
      this._snackBar.open(error, "Ok", { duration: 5000, panelClass: ['error-snackbar'] });
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
