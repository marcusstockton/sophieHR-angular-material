import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeDetailDto, EmployeesClient } from '../client';
import * as dayjs from 'dayjs';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.scss'],
  standalone: false
})
export class BoardUserComponent implements OnInit, OnDestroy {

  public employeeId: string | null;
  public employeeRecord: EmployeeDetailDto;
  public userImage: any;
  public loading: boolean = false;
  public employeeAge: string;
  public employmentLength: string;
  private routeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeesClient,
    private sanitizer: DomSanitizer,
    private _snackBar: MatSnackBar,
    readonly dialog: MatDialog,
    private router: Router,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log('BoardUserComponent ngOnInit');
    this.routeSub = this.route.paramMap.subscribe(params => {
      this.employeeId = params.get('userid');
      console.log('Param changed, employeeId:', this.employeeId);
      if (this.employeeId != null) {
        this.loadEmployee();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  private loadEmployee(): void {
    console.log('Loading employee:', this.employeeId);
    this.loading = true;

    this.employeeService.getEmployee(this.employeeId!).subscribe({
      next: (employee: EmployeeDetailDto) => {
        console.log('Employee loaded:', employee.firstName);
        this.loading = false;
        this.employeeRecord = employee;
        if (employee.dateOfBirth) {
          let employeeAge = this.dateDiff(employee.dateOfBirth);
          this.employeeAge = `${employeeAge?.years} years, ${employeeAge?.months} months`
        }
        if (employee.startOfEmployment) {
          let employmentLength = this.dateDiff(employee.startOfEmployment);
          this.employmentLength = `${employmentLength?.years} years, ${employmentLength?.months} months, ${employmentLength?.days} days`
        }
        if (employee.avatar) {
          this.userImage = this.sanitizer.bypassSecurityTrustUrl("data:image/png;base64, " + employee.avatar?.avatar);
        }

        this.employeeRecord.nationalInsuranceNumber = this.employeeRecord?.nationalInsuranceNumber?.replace(/(.{2})/g, '$1 ') // Splits out the string into 2's
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Error loading employee:', err);
        this.loading = false;
        let message: string;
        switch (err.status) {
          case HttpStatusCode.NotFound:
            message = `Unable to find user with id ${this.employeeId}`;
            break;
          default:
            message = err.message;
        }
        this._snackBar.open(message, "Ok");
        this.cdr.detectChanges();
      }
    });
  }

  private dateDiff(startdate: Date) {
    //define moments for the startdate and enddate
    var startdateMoment = dayjs.default(startdate);
    var enddateMoment = dayjs.default(new Date());

    if (startdateMoment.isValid() === true && enddateMoment.isValid() === true) {
      //getting the difference in years
      var years = enddateMoment.diff(startdateMoment, 'years');

      //moment returns the total months between the two dates, subtracting the years
      var months = enddateMoment.diff(startdateMoment, 'months') - (years * 12);

      //to calculate the days, first get the previous month and then subtract it
      startdateMoment.add(years, 'years').add(months, 'months');
      var days = enddateMoment.diff(startdateMoment, 'days')

      return {
        years: years,
        months: months,
        days: days
      };

    }
    else {
      return undefined;
    }
  }

  editUser() {
    this.router.navigate([`/user/${this.employeeId}/edit`]);
  };


  onNotesChanged(val: any) {
    if (val && this.employeeId) {
      this.loadEmployee();
    }
  }

}
