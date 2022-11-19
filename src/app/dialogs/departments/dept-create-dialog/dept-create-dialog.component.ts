import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { DepartmentCreateDto, DepartmentsClient } from 'src/app/client';

@Component({
  selector: 'app-dept-create-dialog',
  templateUrl: './dept-create-dialog.component.html',
  styleUrls: ['./dept-create-dialog.component.scss']
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

    this.departmentClient.postDepartment(dept).subscribe({
      next: (val)=> { 
        this._snackBar.open(`Department ${val.name} created`, "", {duration: 2000, panelClass: ['successsnackbar']});  
        this.dialogRef.close()
      },
      error: (err) =>{ 
        this._snackBar.open(err, "", {duration: 2000, panelClass: ['errorsnackbar']})
      }
    })
  }
}
