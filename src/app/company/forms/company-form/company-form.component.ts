import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, filter, finalize, map, pipe, startWith, switchMap, tap } from 'rxjs';
import { Address, AddressCreateDto, CompaniesClient, CompanyAddress, CompanyCreateDto, CompanyDetailDto, CompanyDetailNoLogo, Result } from 'src/app/client';
import { CompanyLogoDialogComponent } from '../../dialogs/company-logo-dialog/company-logo-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {

  public companyId: string | null;
  public editing: boolean;
  public companyDetails: CompanyDetailDto;
  public readonly companyForm: FormGroup;
  private postcodeLookupData: Result;
  private minPostcodeLengthLookup: number = 3;
  filteredOptions: Observable<any>;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private _companyService: CompaniesClient,
    private readonly formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {

    this.companyForm = this.formBuilder.group({
      id: [],
      createdDate: [],
      updatedDate: [],
      name: [],
      address: this.formBuilder.group({
        id: [],
        createdDate: [],
        updatedDate: [],
        line1: ["", { validators: [Validators.required, Validators.minLength(2)] }],
        line2: [],
        line3: [],
        line4: [],
        postcode: ["", { validators: [Validators.required, Validators.minLength(6)] }],
        lat: [],
        lon: [],
        county: [],
        mapImage: []
      }),
    });

    this.filteredOptions = this.companyForm.get('address.postcode')!.valueChanges
      .pipe(
        // filter(res => {
        //   return res !== null && res.length <= this.minPostcodeLengthLookup
        // }),
        startWith(''),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(value => this._filter(value) || ""),
      );

  }



  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['companyid']) {
        this.editing = true;
        this.companyId = params['companyid'];
        this.GetCompanyById();
      }

    });
  }


  private GetCompanyById() {
    this._companyService.getCompany(this.companyId!).subscribe(
      {
        next: (res) => {
          this.companyDetails = res;
          this.companyForm.patchValue(res);
        },
        error: (err) => {
          console.log('HTTP Error', err);
        },
        complete: () => {
          console.log('HTTP request completed.');
        }
      }
    );
  }

  getPostcodeInfo(value: string) {
    if (value != '') {
      this._companyService.postcodeLookup(value).subscribe((result) => {
        this.postcodeLookupData = result.result!;
        this.companyForm.get("address.county")?.patchValue(this.postcodeLookupData.admin_county != null ? this.postcodeLookupData.admin_county : this.postcodeLookupData.admin_district);
        this.companyForm.get("address.lat")?.patchValue(this.postcodeLookupData.latitude);
        this.companyForm.get("address.lon")?.patchValue(this.postcodeLookupData.longitude);

        this._companyService.getMapFromLatLong(this.postcodeLookupData.latitude!, this.postcodeLookupData.longitude!, undefined, undefined, undefined, undefined)
          .subscribe((mapStr) => {
            this.companyForm.get("address.mapImage")?.patchValue(mapStr);
            if (this.editing) {
              this.companyDetails!.address!.mapImage = mapStr
            } else {
              this.companyDetails = new CompanyCreateDto({ address: new AddressCreateDto({ mapImage: mapStr }) });
            }
          })
      })
    }
  }

  submitCompany() {
    console.log(this.companyForm)
    if (this.companyForm.valid) {
      if (this.editing) {
        let updatedCompany: CompanyDetailNoLogo = this.companyForm.value; // Change the type for the post
        this._companyService.putCompany(this.companyId!, updatedCompany).subscribe({
          next: (res) => {
            console.log(res.data);
            this.router.navigate(['/company/list']);
          },
          error: (err) => {
            console.log("Error updating company" + err);
          },
          complete: () => {
            console.log("Update Company Completed");
            this._snackBar.open("Successfully updated the company details", "OK", { duration: 2000 });
          }
        });
      } else {
        var companyDto: CompanyCreateDto = this.companyForm.value;
        this._companyService.postCompany(companyDto).subscribe({
          next: (res) => {
            console.log(res);
            this.router.navigate(["/company/list"]);
          },
          error: (err) => {
            console.log("Error creating company" + err);
          },
          complete: () => {
            console.log("Create Company Completed");
            this._snackBar.open("Successfully Created the company", "OK", { duration: 2000 });
          }
        })
      }

    }
  }

  public openLogoDialog() {
    let dialogRef = this.dialog.open(CompanyLogoDialogComponent, {
      data: { companyId: this.companyId },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.GetCompanyById();
    });
  }

  private _filter(value: string): Observable<string[]> | undefined {
    if (value == null || value.length < this.minPostcodeLengthLookup || value == this.companyDetails?.address?.postcode) {
      return undefined;
    }

    return this._companyService.postcodeAutoComplete(value).pipe(
      filter(data => !!data),
      map((data) => {
        return data;
      })
    )
  }
}
