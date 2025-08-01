import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepartmentCreateDto, DepartmentsClient } from 'src/app/client';

@Component({
  selector: 'app-dept-create-dialog',
  templateUrl: './dept-create-dialog.component.html',
  styleUrls: ['./dept-create-dialog.component.scss'],
  standalone: false
})
export class DeptCreateDialogComponent {

  constructor(
    private fb: UntypedFormBuilder,
    private _snackBar: MatSnackBar,
    private departmentClient: DepartmentsClient,
    public dialogRef: MatDialogRef<DeptCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public departmentForm: UntypedFormGroup = this.fb.group({
    name: [null, [Validators.required]],
  });


  submit() {
    var dept = new DepartmentCreateDto({
      companyId: this.data.companyId,
      name: this.departmentForm.get("name")?.value
    });

    if (!dept.name) {
      this._snackBar.open("Department name is required", "", { duration: 2000, panelClass: ['error-snackbar'] });
      return;
    }

    this.departmentClient.postDepartment(dept).subscribe({
      next: (val) => {
        this._snackBar.open(`Department ${val.name} created`, "", { duration: 2000, panelClass: ['success-snackbar'] });
        this.dialogRef.close()
      },
      error: (err) => {
        this._snackBar.open(err, "", { duration: 2000, panelClass: ['error-snackbar'] })
      }
    })
  }
}
