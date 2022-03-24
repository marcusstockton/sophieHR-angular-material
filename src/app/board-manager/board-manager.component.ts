import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { EmployeeList } from '../_models/EmployeeList';
import { CompanyService } from '../_services/company.service';
import { EmployeeService } from '../_services/employee.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-board-manager',
  templateUrl: './board-manager.component.html',
  styleUrls: ['./board-manager.component.scss']
})
export class BoardManagerComponent implements OnInit, AfterViewInit {

  user: any;
  company: any;
  employees: EmployeeList[];
  isLoading: boolean;
  dataSource = new MatTableDataSource<EmployeeList>();
  displayedColumns: string[] = ['firstName', 'middleName', 'lastName','jobTitle', 'workEmailAddress', 'workPhoneNumber', 'holidayAllowance', 'dateOfBirth', 'startOfEmployment'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private companyService: CompanyService, 
    private tokenStorageService: TokenStorageService, 
    private employeeService: EmployeeService,
    private router: Router) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();

    this.companyService.getCompanyById(this.user['companyId'])
      .pipe(map(res => {
        this.company = res;
      })).subscribe();

    this.isLoading = true;
    this.employeeService.getEmployeesByManagerId(this.user['id'])
      .pipe(map(results => {
        this.employees = results;
        this.dataSource.data = this.employees;
        this.isLoading = false;
      })).subscribe();
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
    //alert("Row clicked:" + JSON.stringify(row));
    console.log(JSON.stringify(row));
    this.router.navigate(['/user/'+row.id]);
  }
}
