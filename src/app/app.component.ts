import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './_services/token-storage.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { UserService } from './_services/user.service';
import { MatSidenav } from '@angular/material/sidenav';

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
    private http: HttpClient, 
    private userService: UserService) { }

  ngOnInit(): void {
    this.tokenStorageService.isLoggedIn.subscribe(data=>{
      if (!!this.tokenStorageService.getToken()) {
        this.isExpanded = true;
        const user = this.tokenStorageService.getUser();
        this.role = user.role;
        this.username = user.username;
        if (this.role === "Admin") {
          this.getCompanies();
        }
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

  getCompanies() {
    this.http.get(environment.base_url + "/Companies")
      .pipe(
        map((res: any) => {
          res.forEach((element: any) => {
            this.companyNames.push({ id: element.id, name: element.name });
          });
        })).subscribe();
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
}
