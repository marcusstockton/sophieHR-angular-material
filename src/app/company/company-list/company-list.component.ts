import { HttpStatusCode } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CompaniesClient, CompanyDetailNoLogo } from 'src/app/client';
import { PeriodicElement } from 'src/app/home/home.component';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit, AfterViewInit {

  public companies: CompanyDetailNoLogo[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  displayedColumns: string[] = ['id', 'name', 'createdDate', 'updatedDate', 'postcode', 'lat', 'lon'];

  constructor(private readonly companyService: CompaniesClient, private _snackBar: MatSnackBar) { }
  dataSource = new MatTableDataSource<CompanyDetailNoLogo>();
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe(
      {
        next: (result) => {
          this.companies = result;
          this.dataSource.data = result;
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
