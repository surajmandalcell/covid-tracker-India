import { DatastoreService } from './../services/datastore.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ThemeService } from '../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  constructor(public data: DatastoreService, public theme: ThemeService) {
    data.getAllCountry();
    this.dark = theme.dark;
    theme.darkObs.subscribe((val) => {
      this.dark = val;
    });
  }

  dark: boolean;

  // options
  barChart = {
    showYAxis: true,
    gradient: false,
    showXAxis: true,
    showLegend: false,
    xAxisLabel: 'Age',
    showYAxisLabel: false,
    showXAxisLabel: false,
    yAxisLabel: 'Death %',
    legendPosition: 'below',
  };

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
      '#92E7E8',
    ],
  };

  searchForm = new FormGroup({
    search: new FormControl('', []),
  });

  search() {
    this.data.countries = this.data.countries2.filter((y) =>
      y.country
        .toLowerCase()
        .includes(this.searchForm.value.search.toLowerCase())
    );
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

  ngOnInit(): void {}
}
