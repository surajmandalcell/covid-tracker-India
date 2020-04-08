import { DatastoreService } from './../services/datastore.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  // options
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

  constructor(public data: DatastoreService) {
    data.getAllCountry();
  }

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
