import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompaniesClient, CompanyDetailNoLogo } from 'src/app/client';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  public companies: CompanyDetailNoLogo[];

  constructor(private readonly companyService: CompaniesClient, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe(
      {
        next: (result) => {
          this.companies = result;
        },
        error: (err) => {
          console.log(err);
          let errorMessage = "";
          switch (err.status) {
            case HttpStatusCode.Forbidden:
              errorMessage = "You are not authorised to view this page";
              break;
            case HttpStatusCode.InternalServerError:
              errorMessage = "Something went wrong on the server....";
              break;
            default:
              errorMessage = "Something unforeseen went wrong :-(";
          }
          this._snackBar.open(errorMessage, "Ok");
        }
      }
    )
  }

}
