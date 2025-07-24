import { Component } from '@angular/core';
import { DepartmentsClient, IUserTokens } from '../client';
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
  styleUrl: './departments.component.scss'
})
export class DepartmentsComponent {

  departments: any[] = [];
  user: IUserTokens | null = null;

  constructor(
    private departmentClient: DepartmentsClient,
    private tokenStorageService: TokenStorageService,
    private _snackBar: MatSnackBar,
    readonly dialog: MatDialog,
  ) {
    // Initialization code can go here 

    this.user = this.tokenStorageService.getUser();


    this.departmentClient.getDepartmentsByCompanyId(this.user?.companyId!).subscribe(departments => {
      this.departments = departments;
    }, error => {
      this._snackBar.open(error, "Ok", { duration: 5000, panelClass: ['error-snackbar'] });
    });

  }



  public openAddDepartmentDialog() {
    // console.log("Open Note Dialog hit");
    const dialogRef = this.dialog.open(DeptCreateDialogComponent, { width: '600px', data: { companyId: this.user?.companyId } });
    dialogRef.afterClosed().subscribe({
      next: (res: any) => {
        if (res) {
          this.departments.push(res);
          this._snackBar.open(`Department ${res.name} created`, "", { duration: 2000, panelClass: ['success-snackbar'] });
        }
      },
      error: () => { },
    });
  };

}
