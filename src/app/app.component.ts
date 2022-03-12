import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './_services/token-storage.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  role: string;
  isLoggedIn = false;
  username?: string;
  companyNames: string[] = [];

  constructor(private tokenStorageService: TokenStorageService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.role = user.role;
      this.username = user.username;
      if (this.role === "Admin") {
        this.getCompanies();
      }
    }
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
          res.forEach((element: { name: string; }) => {
            this.companyNames.push(element.name);
          });
        })).subscribe();
  }
}
