import { Component, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { stateTable, newsTable } from './../models/general';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  //India Specific Data
  deathsIn: number;
  activeIn: number;
  confirmedIn: number;
  recoveredIn: number;

  // Global Data
  newCases: number;
  totalDead: number;
  newDeaths: number;
  totalCases: number;
  totalRecovered: number;
  totalActiveCases: number;
  totalSeriousCases: number;

  // State Data
  stateDataTotal: any;
  stateData: stateTable[];

  // News Data
  newsData = [];
  showNews: newsTable[];

  // Api url
  readonly apiUrl = 'https://thevirustracker.com';
  readonly api2 = 'https://api.rootnet.in';

  displayedColumns: string[] = ['loc', 'confirmedCasesIndian', 'confirmedCasesForeign', 'discharged', 'deaths'];
  newsColumns: string[] = ['image', 'title', 'time'];

  constructor(public httpClient: HttpClient, private elementRef: ElementRef) {
    this.getCountryData();
    this.getGlobalData();
    this.getStateData();
  }

  consol(){
    console.log();
    console.log(this.newsData);
  }

  async getCountryData() {
    this.httpClient.get(this.api2 + '/covid19-in/unofficial/covid19india.org/statewise').subscribe((res: any) => {
      this.deathsIn = res.data.total.deaths;
      this.activeIn = res.data.total.active;
      this.confirmedIn = res.data.total.confirmed;
      this.recoveredIn = res.data.total.recovered;
    });
  }

  async getGlobalData() {
    this.httpClient.get(this.apiUrl + '/free-api?global=stats').subscribe((res: any) => {
      console.log(res);
      this.totalCases = res.results[0].total_cases;
      this.totalDead = res.results[0].total_deaths;
      this.totalRecovered = res.results[0].total_recovered;
      this.newCases = res.results[0].total_new_cases_today;
      this.newDeaths = res.results[0].total_new_deaths_today;
      this.totalActiveCases = res.results[0].total_active_cases;
      this.totalSeriousCases = res.results[0].total_serious_cases;
    });
  }

  async getStateData() {
    this.httpClient.get(this.api2 + '/covid19-in/stats/latest').subscribe((res: any) => {
      // this.stateDataTotal = res.data.slice(-1)[0].summary;
      this.stateDataTotal = res.data.summary;
      this.stateData = res.data.regional;
      var total:stateTable={
        loc: "Total Active",
        confirmedCasesIndian: this.stateDataTotal.confirmedCasesIndian,
        confirmedCasesForeign: this.stateDataTotal.confirmedCasesForeign,
        discharged: this.stateDataTotal.discharged,
        deaths: this.stateDataTotal.deaths
      }
      this.stateData.push(total);
    })
  }

}
