import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { IWeight } from 'src/app/core/models/weight/weight';

@Component({
  selector: 'app-weight-chart',
  standalone: false,
  templateUrl: './weight-chart.component.html',
  styleUrl: './weight-chart.component.scss'
})
export class WeightChartComponent {
  private _entries: IWeight[] = [];

  @Input()
  public isExpanded = false;

  @Output()
  public isExpandedChange = new EventEmitter<boolean>();

  public chartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Weight',
        data: []
      }
    ]
  };

  public chartOptions: ChartConfiguration<'line'>['options'] = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    }
  };

  @Input()
  public set entries(value: IWeight[]) {
    this._entries = value ?? [];
    this.updateChartData();
  }

  public get entries(): IWeight[] {
    return this._entries;
  }

  public onToggleExpand(): void {
    this.isExpanded = !this.isExpanded;
    this.isExpandedChange.emit(this.isExpanded);
  }

  private updateChartData(): void {
    this.chartData = {
      labels: this._entries.map(x => x.date),
      datasets: [
        {
          label: 'Weight',
          data: this._entries.map(x => x.weight)
        }
      ]
    };
  }
}
