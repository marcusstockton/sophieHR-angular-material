import { Component, Input } from '@angular/core';
import { CompaniesClient, CompanyDetailDto } from 'src/app/client';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent {
  private _companyId: string;
  company: CompanyDetailDto;
  @Input() set companyId(value:string){
    this._companyId = value;
    this.getCompanyDetails(this._companyId);
  }
  constructor(private readonly companyService: CompaniesClient,) { }

  getCompanyDetails(companyId:string){
    // do stuff
    this.companyService.getCompany(this.companyId).subscribe((result: CompanyDetailDto) => {
      this.company = result;
    });
  }
  get companyId(): string {
    return this._companyId;
  }
}
