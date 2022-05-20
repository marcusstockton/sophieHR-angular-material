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
  styleUrls: ['./board-manager.component.scss']
})
export class BoardManagerComponent implements OnInit, AfterViewInit {

  user: any;
  company: CompanyDetailDto;
  employees: EmployeeListDto[];
  isLoading: boolean;
  dataSource = new MatTableDataSource<EmployeeListDto>();
  displayedColumns: string[] = ['firstName', 'lastName','jobTitle', 'workEmailAddress', 'workPhoneNumber', 'holidayAllowance', 'dateOfBirth', 'startOfEmployment'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private companyService: CompaniesClient, 
    private tokenStorageService: TokenStorageService, 
    private employeeService: EmployeesClient,
    private router: Router) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
    this.isLoading = true;
    this.companyService.getCompany(this.user['companyId']).subscribe((result: CompanyDetailDto)=>{
      this.company = result;
    })
    this.employeeService.getEmployeesForManager(this.user['id']).subscribe((results) => {
      this.employees = results;
      this.dataSource.data = this.employees;
    });
    this.isLoading = false;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getEmployeeRecord(row: any) {
    console.log(JSON.stringify(row));
    this.router.navigate(['/user/'+row.id]);
  }
}
