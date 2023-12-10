import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LeaveRequest, LeaveRequestsClient } from 'src/app/client';
import { LeaveRequestFormComponent } from '../../dialogs/leave/leave-request-form/leave-request-form.component';
import { LeaveType } from 'src/app/client';

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.scss']
})
export class LeaveListComponent implements OnInit {

  @Input() employeeId: string | undefined;
  LeaveType: typeof LeaveType = LeaveType;

  public leaveRequests: LeaveRequest[];
  leaveTypes: (string | LeaveType)[];

  constructor(private leaveRequestClient: LeaveRequestsClient, readonly dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.leaveRequestClient.getLeaveRequestsForEmployee(this.employeeId!).subscribe(
      {
        next: (result: LeaveRequest[]) => {
          this.leaveRequests = result.sort((b, a) => new Date(b.startDate!).getDate() - new Date(a.startDate!).getDate());
        }
        , error: (err: any) => {
          console.log(err);
        }
      });
  }


  openLeaveDialog(leaveRequest: any) {
    let dialogRef = this.dialog.open(LeaveRequestFormComponent, {
      width: '800px',
      data: { leaveRequest, employeeId: this.employeeId }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result instanceof LeaveRequest) {
        this.leaveRequests.push(result);
      }
    });
  }

  public getLeaveApproval(leaveRequest: LeaveRequest) {
    if (leaveRequest.approved && leaveRequest.approvedById) {
      // approved
      return "check";
    }
    else if (!leaveRequest.approved && leaveRequest.approvedById == null) {
      // In progress
      return "pending"
    }
    else if (!leaveRequest.approved) {
      // denied
      return "clear";
    }
    return "";
  }
}
