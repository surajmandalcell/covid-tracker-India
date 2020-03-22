import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface stateTable {
  loc: string;
  confirmedCasesIndian: number;
  confirmedCasesForeign: number;
  discharged: number;
  deaths: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
  // Api url
  stateData: stateTable[];
  readonly apiUrl = 'https://thevirustracker.com';
  readonly api2 = 'https://api.rootnet.in/covid19-in/stats/daily';

  constructor(public httpClient: HttpClient) {
    this.getCountryData();
    this.getGlobalData();
    this.getStateData();
  }

  getCountryData() {
    this.httpClient.get(this.apiUrl + '/free-api?countryTotal=IN').subscribe((res: any) => {
      console.log(res);
      this.confirmedIn = res.countrydata[0].total_cases;
      this.deathsIn = res.countrydata[0].total_deaths;
      this.recoveredIn = res.countrydata[0].total_recovered;
      this.newDeathsTodayIn = res.countrydata[0].total_new_deaths_today;
      this.newConfirmedTodayIn = res.countrydata[0].total_new_cases_today;
    });
  }

  getGlobalData() {
    this.httpClient.get(this.apiUrl + '/free-api?global=stats').subscribe((res: any) => {
      console.log(res);
      this.totalCases = res.results[0].total_cases;
      this.totalDead = res.results[0].total_deaths;
      this.totalRecovered = res.results[0].total_recovered;
      this.newDeaths = res.results[0].total_new_deaths_today;
      this.newCases = res.results[0].total_new_cases_today;
    });
  }

  getStateData() {
    this.httpClient.get(this.api2).subscribe((res: any) => {
      console.log(res);
      this.stateData = res.data.slice(-1)[0].regional;
      console.log("state table");
      console.log(this.stateData);
    })
  }

  title = 'covid-tracker-India';
  displayedColumns: string[] = ['loc', 'confirmedCasesIndian', 'confirmedCasesForeign', 'discharged', 'deaths'];
}
