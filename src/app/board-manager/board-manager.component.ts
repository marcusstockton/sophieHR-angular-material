import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CompaniesClient, CompanyDetailDto, EmployeeListDto, EmployeesClient } from '../client';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-board-manager',
  templateUrl: './board-manager.component.html',
  styleUrls: ['./board-manager.component.scss'],
  standalone: false
})
export class BoardManagerComponent implements OnInit, AfterViewInit {

  user: any;
  company: CompanyDetailDto;
  companyMap: string;
  isLoading: boolean;
  dataSource = new MatTableDataSource<EmployeeListDto>();
  displayedColumns: string[] = ['firstName', 'lastName', 'jobTitle', 'workEmailAddress', 'workPhoneNumber', 'holidayAllowance', 'dateOfBirth', 'startOfEmployment'];
  @ViewChild(MatPaginator) private paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private companyService: CompaniesClient,
    private tokenStorageService: TokenStorageService,
    private employeeService: EmployeesClient,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.user = this.tokenStorageService.getUser();
    if (!this.user) {
      this.router.navigate(['/login/']);
    }

    this.getCompany();
    this.getEmployees();
    this.isLoading = false;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getEmployeeRecord(row: any) {
    this.router.navigate(['/user/' + row.id]);
  }

  getCompany() {
    this.companyService.getCompany(this.user['companyId']).subscribe((result: CompanyDetailDto) => {
      this.company = result;
      if (this.company.address?.mapImage == null && this.company.address?.lat! > 0 && this.company.address?.lon! > 0) {
        this.companyService.getMapFromLatLong(this.company.address?.lat, this.company.address?.lon, undefined, undefined, undefined).subscribe({
          next: img => {
            this.companyMap = img;
          }
        })
      }
      else {
        this.companyMap = this.company.address?.mapImage!
      }
    });
  }

  getEmployees() {
    this.employeeService.getEmployeesForManager(this.user['id']).subscribe((results: EmployeeListDto[]) => {
      this.dataSource.data = results;
    });
  }





}
