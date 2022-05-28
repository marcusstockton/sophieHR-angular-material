import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CompaniesClient, CompanyDetailDto, EmployeeListDto, EmployeesClient, KeyValuePairOfGuidAndString } from 'src/app/client';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.scss']
})
export class BoardAdminComponent implements OnInit, AfterViewInit {

  companyId: string;
  company: CompanyDetailDto;
  companies: KeyValuePairOfGuidAndString[] = [];

  displayedColumns: string[] = ['firstName', 'middleName', 'lastName', 'jobTitle', 'workEmailAddress',
    'personalEmailAddress', 'workPhoneNumber', 'workMobileNumber', 'holidayAllowance', 'dateOfBirth', 'startOfEmployment', 'department'];
  dataSource: MatTableDataSource<EmployeeListDto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService,
    private readonly companyService: CompaniesClient,
    private readonly employeesClient: EmployeesClient
  ) { }

  ngOnInit(): void {
    this.userService.companyId.subscribe((x => {
      this.companyId = x;
      if (this.companyId) {
        this.companyService.getCompany(this.companyId).subscribe((result: CompanyDetailDto) => {
          this.company = result;

          this.employeesClient.getEmployeesForCompanyId(this.company.id!).subscribe((employees: EmployeeListDto[]) => {
            this.dataSource = new MatTableDataSource(employees);
          })
        });
      }
    }));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
