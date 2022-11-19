import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LeaveRequest, LeaveRequestsClient } from 'src/app/client';
import { LeaveRequestFormComponent } from '../../dialogs/leave/leave-request-form/leave-request-form.component';

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.scss']
})
export class LeaveListComponent implements OnInit {

  @Input() employeeId: string | undefined;

  public leaveRequests: LeaveRequest[];

  constructor(private leaveRequestClient: LeaveRequestsClient, readonly dialog: MatDialog) { }

  ngOnInit(): void {
    this.leaveRequestClient.getLeaveRequestsForEmployee(this.employeeId!).subscribe(
      { next: (result: LeaveRequest[]) => { 
        this.leaveRequests = result;
      }
      , error: (err: any) => { 
        console.log(err);
      }
    });
  }


  openLeaveDialog(leaveRequest:any){
    const dialogRef = this.dialog.open(LeaveRequestFormComponent, { width: '600px', data: {leaveRequest, employeeId: this.employeeId}});
  }
}
