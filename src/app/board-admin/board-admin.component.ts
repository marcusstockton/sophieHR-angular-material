import { Component, OnInit } from '@angular/core';
import { CompaniesClient, CompanyDetailDto, KeyValuePairOfGuidAndString } from 'src/app/client';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.scss']
})
export class BoardAdminComponent implements OnInit {

  content?: string;
  companyId: string;
  company: CompanyDetailDto;
  companies: KeyValuePairOfGuidAndString[] = [];

  constructor(private userService: UserService, private readonly companyService: CompaniesClient) { }

  ngOnInit(): void { 
    this.userService.companyId.subscribe((x => {
      this.companyId = x;
      if (this.companyId) {
        this.companyService.getCompany(this.companyId).subscribe((result: CompanyDetailDto) => {
          this.company = result;
        });
      }
    }));
  }

  onCompanyChange(companyId: string) {
    console.log("You clicked on company id: " + companyId);
    this.userService.updateCompanyId(companyId);
  }
}
