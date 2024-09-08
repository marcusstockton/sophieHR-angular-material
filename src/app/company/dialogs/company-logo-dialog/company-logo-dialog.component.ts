import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompaniesClient } from 'src/app/client';
import { FileParameter } from '../../../client';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-company-logo-dialog',
  templateUrl: './company-logo-dialog.component.html',
  styleUrls: ['./company-logo-dialog.component.scss']
})

export class CompanyLogoDialogComponent {
  public editing: boolean;
  public preview: string;
  public error: string;
  private logo: FileParameter;

  selectedFile: ImageSnippet;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { companyId: string },
    private dialogRef: MatDialogRef<CompanyLogoDialogComponent>,
    private _companyService: CompaniesClient, private _snackBar: MatSnackBar) {
    if (data.companyId) {
      this.editing = true;
    }
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.error = '';
      this.selectedFile = new ImageSnippet(event.target.result, file);
      if (this.selectedFile.file.size > 1000000) {
        this.error = "Image size too large. Needs to be less than 1MB.";
        return;
      }
      this.preview = this.selectedFile.src;

      this.logo = {
        data: this.selectedFile.file,
        fileName: this.selectedFile.file.name
      };
    });

    reader.readAsDataURL(file);
  }

  submit() {
    this._companyService.uploadLogo(this.data.companyId, this.logo).subscribe(
      {
        next: (res) => {
          this._snackBar.open("Successfully updated the company logo", "OK", { duration: 2000, panelClass: ['success-snackbar'] });
          this.dialogRef.close(res);
        },
        error: (err) => {
          this._snackBar.open(err, "Ok", { panelClass: ['error-snackbar'] })
        }
      }
    )
  }
}

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}