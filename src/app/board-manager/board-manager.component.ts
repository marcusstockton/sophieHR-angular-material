import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { CompanyService } from '../_services/company.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-board-manager',
  templateUrl: './board-manager.component.html',
  styleUrls: ['./board-manager.component.scss']
})
export class BoardManagerComponent implements OnInit {

  user: any;
  company: any;

  constructor(private companyService: CompanyService, private tokenStorageService: TokenStorageService) { 
    this.user = this.tokenStorageService.getUser();

    this.companyService.getCompanyById(this.user['companyId'])
      .pipe(map(res => {
        this.company = res
      })).subscribe();
  }

  ngOnInit(): void {
    
  }

}
