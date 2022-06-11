import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { TokenStorageService } from './_services/token-storage.service';
import { UserService } from './_services/user.service';
import { MatSidenav } from '@angular/material/sidenav';
import { CompaniesClient, KeyValuePairOfGuidAndString } from './client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  role: string;
  username?: string;
  isExpanded: boolean;
  companyNames: KeyValuePairOfGuidAndString[] = [];
  companyId?: string;

  @ViewChild(MatSidenav) sidenav: MatSidenav;
  constructor(public tokenStorageService: TokenStorageService,
    private router: Router,
    private userService: UserService,
    private companyService: CompaniesClient,
    ) {

      router.events.subscribe(Event => {
        if(Event instanceof NavigationStart) {
             //you code for checking and navigation
             if (this.tokenStorageService.getToken()) {
              this.isExpanded = true;
              const user = this.tokenStorageService.getUser();
              this.role = user.role;
              this.username = user.username;
              if(this.role == "Admin"){
                this.getCompanies();
              }
            }
        }
      });
     }

  ngOnInit(): void {
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  viewProfile() {
    this.router.navigate(['/profile'])
  }

  getCompanies(){
    this.companyService.getCompanyNames().subscribe((companies)=>{
      this.companyNames.push(...companies);
    })
  }

  onCompanyChange(companyId: string) {
    localStorage.setItem('currentCompanyId', companyId);
    this.userService.updateCompanyId(companyId);
  }

  clearCompany($event: any) {
    this.companyId = undefined;
    $event.stopPropagation();
    this.userService.updateCompanyId("");
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: number; }; }) {
    if (event.target.innerWidth < 500) {
      this.sidenav.close();
    }
    if (event.target.innerWidth > 500) {
      this.sidenav.open();
    }
  }
}
