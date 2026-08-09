import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';
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
  company: CompanyDetailDto | null = null;
  isLoading = false;
  totalEmployees = 0;
  dataSource = new MatTableDataSource<EmployeeListDto>();
  displayedColumns: string[] = ['firstName', 'lastName', 'jobTitle', 'workEmailAddress', 'workPhoneNumber', 'holidayAllowance', 'dateOfBirth', 'startOfEmployment'];
  @ViewChild(MatPaginator) private paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private companyService: CompaniesClient,
    private tokenStorageService: TokenStorageService,
    private employeeService: EmployeesClient,
    private router: Router,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();

    if (!this.user) {
      this.router.navigate(['/login/']);
      return;
    }

    this.loadDashboardData();
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

  private loadDashboardData(): void {
    this.isLoading = true;
    this.company = null;
    this.dataSource.data = [];
    this.cdr.detectChanges();

    const companyId = this.user?.companyId;
    const managerId = this.user?.id;

    if (!companyId || !managerId) {
      this.isLoading = false;
      this.cdr.detectChanges();
      return;
    }

    forkJoin({
      company: this.companyService.getCompany(companyId),
      employees: this.employeeService.getEmployeesForManager(managerId)
    }).pipe(
      finalize(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: ({ company, employees }) => {
        this.company = company;
        this.dataSource.data = employees ?? [];
        this.totalEmployees = this.dataSource.data.length;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load manager dashboard data', error);
        this.company = null;
        this.dataSource.data = [];
        this.cdr.detectChanges();
      }
    });
  }

}
