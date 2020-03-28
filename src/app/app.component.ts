import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { stateTable, newsTable } from './models/general';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Covid 19';

  //India Specific Stats
  deathsIn: number;
  confirmedIn: number;
  recoveredIn: number;
  newDeathsTodayIn: number;
  newConfirmedTodayIn: number;

  // Global Stats
  newCases: number;
  totalDead: number;
  newDeaths: number;
  totalCases: number;
  totalRecovered: number;

  // State Data
  stateDataTotal: any;
  stateData: stateTable[];

  // News Data
  newsData = [];
  showNews: newsTable[];

  // Api url
  readonly apiUrl = 'https://thevirustracker.com';
  readonly api2 = 'https://api.rootnet.in/covid19-in/stats/daily';

  displayedColumns: string[] = ['loc', 'confirmedCasesIndian', 'confirmedCasesForeign', 'discharged', 'deaths'];
  newsColumns: string[] = ['image', 'title', 'time'];

  constructor(public httpClient: HttpClient) {
    this.getCountryData();
    this.getGlobalData();
    this.getStateData();
  }

  consol(){
    console.log();
    console.log(this.newsData);
  }

  getCountryData() {
    this.httpClient.get(this.apiUrl + '/free-api?countryTotal=IN').subscribe((res: any) => {
      this.confirmedIn = res.countrydata[0].total_cases;
      this.deathsIn = res.countrydata[0].total_deaths;
      this.recoveredIn = res.countrydata[0].total_recovered;
      this.newDeathsTodayIn = res.countrydata[0].total_new_deaths_today;
      this.newConfirmedTodayIn = res.countrydata[0].total_new_cases_today;
    });
  }

  getGlobalData() {
    this.httpClient.get(this.apiUrl + '/free-api?global=stats').subscribe((res: any) => {
      this.totalCases = res.results[0].total_cases;
      this.totalDead = res.results[0].total_deaths;
      this.totalRecovered = res.results[0].total_recovered;
      this.newDeaths = res.results[0].total_new_deaths_today;
      this.newCases = res.results[0].total_new_cases_today;
    });
  }

  getStateData() {
    this.httpClient.get(this.api2).subscribe((res: any) => {
      this.stateDataTotal = res.data.slice(-1)[0].summary;
      this.stateData = res.data.slice(-1)[0].regional;
      var total:stateTable={
        loc: "Total",
        confirmedCasesIndian: this.stateDataTotal.confirmedCasesIndian,
        confirmedCasesForeign: this.stateDataTotal.confirmedCasesForeign,
        discharged: this.stateDataTotal.discharged,
        deaths: this.stateDataTotal.deaths
      }
      this.stateData.push(total);
    })
  }
}
