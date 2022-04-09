import { Component, OnInit } from '@angular/core';
import { CompanyDetailDto } from 'src/libs/client';
import { CompanyService } from '../_services/company.service';
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
  constructor(private userService: UserService, private companyService: CompanyService) { 
    this.userService.companyId.subscribe((x=>{
      this.companyId = x;

      this.companyService.getCompanyById(this.companyId).subscribe((result: CompanyDetailDto)=>{
        this.company = result;
      }, (err)=>{
        console.log(err);
      })

    }));
  }
  ngOnInit(): void { }
}
