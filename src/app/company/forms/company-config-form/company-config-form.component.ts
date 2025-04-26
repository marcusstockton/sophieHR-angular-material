import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-company-config-form',
  standalone: false,
  templateUrl: './company-config-form.component.html',
  styleUrl: './company-config-form.component.scss'
})
export class CompanyConfigFormComponent {
  constructor(private location: Location) { }




  back() {
    this.location.back();
  }
}
