import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CompaniesClient } from 'src/app/client';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-employee-count-chart',
  standalone: true,
  imports: [BaseChartDirective],
  //providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './employee-count-chart.component.html',
  styleUrls: ['./employee-count-chart.component.scss']
})
export class EmployeeCountChartComponent implements OnInit, OnChanges {
  @Input() companyId: any;
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  employeeCountByMonth: any;
  chartData: ChartData<'line'> = { labels: [], datasets: [] };

  constructor(private companyService: CompaniesClient) {
  }
  ngOnInit(): void {
    // Attempt to load data if input is already set at init
    if (this.companyId) {
      this.loadData();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // react if companyId input arrives or changes after init
    if (changes['companyId'] && this.companyId) {
      this.loadData();
    }
  }

  private loadData(): void {
    this.companyService.getCompanyEmployeeCountByMonth(this.companyId).subscribe(result => {
      this.employeeCountByMonth = result.map(x => ({
        month: x.month,
        year: x.year,
        count: x.count,
      }));

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

      // Ask the chart component to re-render — ensures chart appears even if container
      // was initially hidden or the canvas size changed after creation.
      setTimeout(() => this.chart?.update(), 0);
    });
  }

}
