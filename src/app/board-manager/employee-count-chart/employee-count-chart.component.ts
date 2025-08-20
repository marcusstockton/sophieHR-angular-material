import { Component, Input, OnInit } from '@angular/core';
import { CompaniesClient } from 'src/app/client';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-employee-count-chart',
  //providers: [provideCharts(withDefaultRegisterables())],
  imports: [BaseChartDirective],
  templateUrl: './employee-count-chart.component.html',
  styleUrl: './employee-count-chart.component.scss'
})
export class EmployeeCountChartComponent implements OnInit {
  @Input() companyId: any;
  employeeCountByMonth: any;
  chartData: ChartData<'line'> = { labels: [], datasets: [] };

  constructor(private companyService: CompaniesClient) {
  }
  ngOnInit(): void {
    if (this.companyId) {
      this.companyService.getCompanyEmployeeCountByMonth(this.companyId).subscribe(result => {
        this.employeeCountByMonth = result.map(x => {
          return {
            month: x.month,
            year: x.year,
            count: x.count,
          };
        });

        // Prepare data for Chart.js
        this.chartData = {
          labels: this.employeeCountByMonth.map((x: { month: any; year: any; }) => `${x.month}/${x.year}`),
          datasets: [
            {
              label: 'Employee Count',
              data: this.employeeCountByMonth.map((x: { count: any; }) => x.count),
              fill: false,
              borderColor: '#3f51b5',
              tension: 0.1
            }
          ]
        };
      });
    }
  }

}
