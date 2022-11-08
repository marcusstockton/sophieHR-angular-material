import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeaveRequest, LeaveRequestsClient } from 'src/app/client';

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

  public dateOptions = ["First Half", "Second Half"]

  public form: FormGroup = this.fb.group({
    employeeId: [null, [Validators.required]],
    approvedById: [null],
    startDate: [Date, [Validators.required]],
    endDate: [Date, [Validators.required]],
    startDateFirstHalf: [Boolean, [Validators.required]],
    startDateSecondHalf: [Boolean, [Validators.required]],
    endDateFirstHalf: [Boolean, [Validators.required]],
    endDateSecondHalf: [Boolean, [Validators.required]],
    approved:[null],
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


  startDateChange(event:Date){
    console.log(event);
  }

  endDateChange(event: Date){
    console.log(event);
  }

  startDatePartial(event:boolean){
    this.startDatePartialDay = event;
  }
  endDatePartial(event:boolean){
    this.endDatePartialDay = event;
  }

  onSubmit(){

  }
}
