import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { EmployeeDetailDto, EmployeesClient } from '../client';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.scss']
})
export class BoardUserComponent implements OnInit {

  public employeeId: string | null;
  public employeeRecord: EmployeeDetailDto;
  public userImage: any;
  public loading: boolean = false;
  public employeeAge: string;
  public employmentLength: string;

  constructor(private route: ActivatedRoute, private employeeService: EmployeesClient, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('userid');
    this.employeeId = id;

    if (this.employeeId != null) {
      this.loading = true;

      this.employeeService.getEmployee(this.employeeId).subscribe((results: EmployeeDetailDto) => {
        this.loading = false;
        this.employeeRecord = results;
        if (results.dateOfBirth) {
          let employeeAge = this.dateDiff(results.dateOfBirth);
          this.employeeAge = `${employeeAge?.years} years, ${employeeAge?.months} months`
        }
        if (results.startOfEmployment) {
          let employmentLength = this.dateDiff(results.startOfEmployment);
          this.employmentLength = `${employmentLength?.years} years, ${employmentLength?.months} months, ${employmentLength?.days} days`
        }

        this.userImage = this.sanitizer.bypassSecurityTrustUrl("data:image/png;base64, " + results.avatar?.avatar);
        this.employeeRecord.nationalInsuranceNumber = this.employeeRecord?.nationalInsuranceNumber?.replace(/(.{2})/g, '$1 ') // Splits out the string into 2's
      });
    }
  }

  private dateDiff(startdate:Date) {
    //define moments for the startdate and enddate
    var startdateMoment = moment(startdate);
    var enddateMoment = moment(new Date());

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
}
