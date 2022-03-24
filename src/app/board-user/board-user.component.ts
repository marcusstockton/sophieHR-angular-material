import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { EmployeeDetailDto } from '../_models/Employee/EmployeeDetailDto';
import { EmployeeService } from '../_services/employee.service';

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

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('userid');
    this.employeeId = id;

    if (this.employeeId != null) {
      this.loading = true;
      this.employeeService.getEmployeeById(this.employeeId).pipe(map(results => {
        this.loading = false;
        this.employeeRecord = results;
        this.userImage = this.sanitizer.bypassSecurityTrustUrl("data:image/png;base64, " + results.avatar.avatar);
      })).subscribe();
    }
  }

}
