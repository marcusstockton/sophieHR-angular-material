import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompaniesClient, CompanyDetailDto } from 'src/app/client';
import {MatLegacySnackBar as MatSnackBar, MatLegacySnackBarModule as MatSnackBarModule} from '@angular/material/legacy-snack-bar';
import { HttpStatusCode } from '@angular/common/http';


@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent {
  private _companyId: string;
  company: CompanyDetailDto;
  errors:string | undefined;
  @Input() set companyId(value:string){
    this._companyId = value;
  }
  constructor(private readonly companyService: CompaniesClient, private route: ActivatedRoute, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    if(!this._companyId){
      this.route.params.subscribe(params => {
        this.companyId = params['companyid'];
      });
    }
    this.getCompanyDetails(this._companyId);
  }

  getCompanyDetails(companyId:string){
    this.companyService.getCompany(this.companyId).subscribe({
      next: (result: CompanyDetailDto) =>{
        this.company = result;
      },
      error: (err)=>{
        if(err.status == HttpStatusCode.NotFound){
              err.title = `Unable to find a company with the Id of ${companyId}`
            }
      }
    })
  }
  get companyId(): string {
    return this._companyId;
  }
}
