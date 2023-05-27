import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CompaniesClient, CompanyDetailDto } from 'src/app/client';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {

  public companyId:string|null;
  public editing:boolean;
  public companyDetails: CompanyDetailDto;
  public readonly companyForm: FormGroup;


  constructor(private route: ActivatedRoute, private _companyService: CompaniesClient, private readonly formBuilder: FormBuilder) {

    this.companyForm = this.formBuilder.group({
      name: [],
      address: this.formBuilder.group({
        line1: [],
        line2: [],
        line3: [],
        line4: [],
        postcode: [],
        county: [],
      }),
      myRequiredField: ['', Validators.required],
    });

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['companyid']){
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
  }

  submitCompany(){
    console.log(this.companyForm)
  }

}
