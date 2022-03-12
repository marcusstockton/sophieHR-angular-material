import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.scss']
})
export class BoardAdminComponent implements OnInit {

  content?: string;
  companyId: string;
  constructor(private userService: UserService) { 
    userService.companyId.subscribe((x=>{
      this.companyId = x;
    }));
  }
  ngOnInit(): void {
    
  }
}
