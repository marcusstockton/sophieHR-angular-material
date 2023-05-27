import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs';
import { CompaniesClient, CompanyDetailDto, Result } from 'src/app/client';

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

  constructor(private route: ActivatedRoute, private _companyService: CompaniesClient, private readonly formBuilder: FormBuilder) {

    this.companyForm = this.formBuilder.group({
      name: [],
      address: this.formBuilder.group({
        line1: [],
        line2: [],
        line3: [],
        line4: [],
        postcode: [],
        lat:[],
        lon:[],
        county: [],
      }),
      myRequiredField: ['', Validators.required],
    });

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['companyid']) {
        this.editing = true;
      }
      this.companyId = params['companyid'];
      this._companyService.getCompany(this.companyId!).subscribe(
        res => {
          this.companyDetails = res
          this.companyForm.patchValue(res);
        },
        err => console.log('HTTP Error', err),
        () => console.log('HTTP request completed.')
      )
    });

    this.filteredOptions = this.companyForm.get('address.postcode')!.valueChanges
      .pipe(
        filter(res => {
          return res !== null && res.length <= this.minPostcodeLengthLookup
        }),
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(value => this._filter(value) || "")
      );
  }


  getPostcodeInfo(value: string) {
    if (value != '') {
      this._companyService.postcodeLookup(value).subscribe((result) => {
        this.postcodeLookupData = result.result!;
        this.companyForm.get("address.county")?.patchValue(this.postcodeLookupData.admin_county);

      })
    }
  }

  submitCompany() {
    console.log(this.companyForm)
  }

  private _filter(value: string) {
    if(value == null || value.length < this.minPostcodeLengthLookup){
      return null;
    }
    return this._companyService.postcodeAutoComplete(value).pipe(
      filter(data => !!data),
      map((data) => {
        return data;
      })
    )
  }
}
