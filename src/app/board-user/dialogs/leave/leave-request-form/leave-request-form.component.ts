import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateLeaveRequest, LeaveRequest, LeaveRequestsClient, LeaveType } from 'src/app/client';
import { map } from 'rxjs';

@Component({
  selector: 'app-leave-request-form',
  templateUrl: './leave-request-form.component.html',
  styleUrls: ['./leave-request-form.component.scss'],
  standalone: false
})
export class LeaveRequestFormComponent implements OnInit {

  public leaveData: LeaveRequest;
  public submitted: boolean;
  public employeeId: any;
  public startDatePartialDay: boolean;
  public endDatePartialDay: boolean;
  public isMultiDay: boolean;

  leaveTypes: { [key: string]: string; };

  public form: FormGroup = this.fb.group({
    leaveType: [LeaveType, [Validators.required]],
    employeeId: [null, [Validators.required]],
    approvedById: [null],
    startDate: [Date, [Validators.required]],
    endDate: [Date, [Validators.required]],
    hours: [Number, null],
    normalHoursPerDay: [Number, null],
    approved: [null],
    comments: [null]
  });





  constructor(
    private fb: FormBuilder,
    private readonly leaveRequestClient: LeaveRequestsClient,
    public dialogRef: MatDialogRef<LeaveRequestFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.leaveRequestClient.getLeaveTypes().subscribe({
      next: leaveTypes => this.leaveTypes = leaveTypes,
      error: x => console.log(x)
    });
  }

  ngOnInit(): void {
    this.employeeId = this.data.employeeId;
    this.form.controls['employeeId'].setValue(this.data.employeeId);
  }


  startDateChange(event: Date) {
    this.form.controls['startDate'].setValue(event);
    // console.log(event);
    var endDate = this.form.controls['endDate'].value;

    if (endDate && endDate > event) {
      this.isMultiDay = true;
    }
  }

  endDateChange(event: Date) {
    var startDate = this.form.controls['startDate'].value;

    if (startDate.toLocaleDateString() === event.toLocaleDateString()) {
      // console.log("same day");
      this.isMultiDay = false;
    } else {
      this.isMultiDay = true;
    }

  }

  startDatePartial(event: boolean) {
    this.startDatePartialDay = event;
  }
  endDatePartial(event: boolean) {
    this.endDatePartialDay = event;
  }

  onSubmit(): any {
    if (!this.form.valid) {
      return this.form.errors;
    }

    var startDate = this.form.controls['startDate'].value;
    var endDate = this.form.controls['endDate'].value;
    var ltid = Number.parseInt(this.form.controls['leaveType'].value);
    var lt: LeaveType = ltid as LeaveType;

    var createRequest = new CreateLeaveRequest({
      employeeId: this.employeeId,
      startDate: startDate,
      endDate: endDate,
      leaveType: lt,
      comments: this.form.controls['comments'].value,
      hours: this.form.controls['hours'].value,
      normalHoursPerDay: this.form.controls['normalHoursPerDay'].value
    });

    this.leaveRequestClient.postLeaveRequest(createRequest).subscribe({
      next: x => this.dialogRef.close(x),
      error: err => console.log(err)
    })
  }
}
