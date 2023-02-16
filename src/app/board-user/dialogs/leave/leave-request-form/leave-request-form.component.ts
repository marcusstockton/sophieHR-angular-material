import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateLeaveRequest, LeaveRequest, LeaveRequestsClient } from 'src/app/client';

@Component({
  selector: 'app-leave-request-form',
  templateUrl: './leave-request-form.component.html',
  styleUrls: ['./leave-request-form.component.scss']
})
export class LeaveRequestFormComponent implements OnInit {

  public leaveData: LeaveRequest;
  public submitted: boolean;
  public employeeId: any;
  public startDatePartialDay: boolean;
  public endDatePartialDay: boolean;
  public isMultiDay: boolean;

  public startDateOptions: { id: number, name: string }[] = [{ id: 0, name: "Start Of Working Day" }, { id: 1, name: "Middle Of Working Day" }];
  public endDateOptions: { id: number, name: string }[] = [{ id: 0, name: "Middle Of Working Day" }, { id: 1, name: "End Of Working Day" }];
  public oneDateOptions = ["All Day", "First Half", "Second Half"];

  public form: FormGroup = this.fb.group({
    employeeId: [null, [Validators.required]],
    approvedById: [null],
    startDate: [Date, [Validators.required]],
    endDate: [Date, [Validators.required]],
    startDateFirstHalf: [Boolean, [Validators.required]],
    startDateSecondHalf: [Boolean, [Validators.required]],
    endDateFirstHalf: [Boolean, [Validators.required]],
    endDateSecondHalf: [Boolean, [Validators.required]],
    approved: [null],
  });


  constructor(
    private fb: FormBuilder,
    private readonly leaveRequestClient: LeaveRequestsClient,
    public dialogRef: MatDialogRef<LeaveRequestFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.employeeId = this.data.employeeId;
    this.form.controls['employeeId'].setValue(this.data.employeeId);
  }


  startDateChange(event: Date) {
    this.form.controls['startDate'].setValue(event);
    console.log(event);
    var endDate = this.form.controls['endDate'].value;

    if (endDate && endDate > event) {
      this.isMultiDay = true;
    }
  }

  endDateChange(event: Date) {
    var startDate = this.form.controls['startDate'].value;

    if (startDate.toLocaleDateString() === event.toLocaleDateString()) {
      console.log("same day");
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

    var createRequest = new CreateLeaveRequest({
      employeeId: this.employeeId,
      startDate: startDate,
      endDate: endDate,
      endDateFirstHalf: this.form.controls['endDateFirstHalf'].value,
      endDateSecondHalf:this.form.controls['endDateSecondHalf'].value,
      startDateFirstHalf: this.form.controls['startDateFirstHalf'].value,
      startDateSecondHalf: this.form.controls['startDateSecondHalf'].value
    });


    var data = this.form.value;
    console.log("You are attempting to submit the following...");
    console.log(data);
  }
}
