import { DatastoreService } from './../services/datastore.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  // options
  pieChartCommon = {
    gradient: false,
    showLegend: true,
    isDoughnut: false,
    showLabels: false,
    animations: false,
    tooltipDisabled: true,
    legendPosition: 'below',
  }
  barChart = {
    showYAxis: true,
    gradient: false,
    showXAxis: true,
    showLegend: true,
    xAxisLabel: 'Age',
    showYAxisLabel: true,
    showXAxisLabel: false,
    yAxisLabel: 'Death %',
    legendPosition: 'below'
  }

  title = {
    pie1: 'Death Rate Men',
    pie2: 'Death Rate Women'
  }

  colorScheme = {
    domain: [
      '#E44D25',
      '#CFC0BB',
      '#FAC51D',
      '#66BD6D',
      '#FAA026',
      '#29BB9C',
      '#E96B56',
      '#55ACD2',
      '#B7332F',
      '#2C83C9',
      '#9166B8',
      '#92E7E8'
    ]
  };

  constructor(public data: DatastoreService) { }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {
  }

}
