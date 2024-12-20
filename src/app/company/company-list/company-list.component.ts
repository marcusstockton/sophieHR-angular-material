import { HttpStatusCode } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CompaniesClient, CompanyDetailNoLogo } from 'src/app/client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss',
  standalone: false
})
export class CompanyListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['name', 'createdDate', 'updatedDate', 'postcode', 'lat', 'lon'];

  constructor(private readonly companyService: CompaniesClient, private _snackBar: MatSnackBar, private router: Router) { }

  dataSource = new MatTableDataSource<CompanyDetailNoLogo>();
  isLoading: boolean = false;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.companyService.getCompanies().subscribe(
      {
        next: (result: CompanyDetailNoLogo[]) => {
          this.dataSource.data = result;
        },
        error: (err) => {
          // console.log(err);
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
          this._snackBar.open(errorMessage, "Ok", { panelClass: ['error-snackbar'] });
        },
        complete: () => this.isLoading = false
      }
    )
  }

  companyDetails(company: CompanyDetailNoLogo) {
    this.router.navigate([`/company/${company.id}`]);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
