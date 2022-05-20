import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './_services/token-storage.service';
import { UserService } from './_services/user.service';
import { MatSidenav } from '@angular/material/sidenav';
import { CompaniesClient } from './client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  role: string;
  username?: string;
  isExpanded: boolean;
  companyNames: { id: string, name: string }[] = [];
  companyId?: string;

  @ViewChild(MatSidenav) sidenav: MatSidenav;
  constructor(public tokenStorageService: TokenStorageService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.tokenStorageService.isLoggedIn.subscribe(data => {
      if (!!this.tokenStorageService.getToken()) {
        this.isExpanded = true;
        const user = this.tokenStorageService.getUser();
        this.role = user.role;
        this.username = user.username;
      }
    })
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  viewProfile() {
    this.router.navigate(['/profile'])
  }

  onCompanyChange(event: any) {
    console.log("You clicked on company id: " + event.id);
    this.userService.updateCompanyId(event.id);
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
