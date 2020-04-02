import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { stateTable } from '../models/general';

@Injectable({
  providedIn: 'root'
})
export class DatastoreService {
  // News
  news: any;

  // India stats
  India = {
    deathsIn: '...',
    activeIn: '...',
    confirmedIn: '...',
    recoveredIn: '...',
  }

  // Global Stats
  Global = {
    newCases: '...',
    totalDead: '...',
    newDeaths: '...',
    totalCases: '...',
    totalRecovered: '...',
    totalActiveCases: '...',
    totalSeriousCases: '...',
  }

  // State Data
  stateDataTotal: any;
  stateData: stateTable[];
  displayedColumns: string[] = ['loc', 'confirmedCasesIndian', 'confirmedCasesForeign', 'discharged', 'deaths'];

  // Api links
  api = {
    thevirustracker: 'https://thevirustracker.com',
    rootnet: 'https://api.rootnet.in',
  }

  constructor(public httpClient: HttpClient) { 
    this.getCountryData();
    this.getGlobalData();
    this.getStateData();
  }

  // Get India statistics
  async getCountryData() {
    this.httpClient.get(this.api.rootnet + '/covid19-in/unofficial/covid19india.org/statewise').subscribe((res: any) => {
      this.India.deathsIn = res.data.total.deaths;
      this.India.activeIn = res.data.total.active;
      this.India.confirmedIn = res.data.total.confirmed;
      this.India.recoveredIn = res.data.total.recovered;
    });
  }

  // Get global statistics
  async getGlobalData() {
    this.httpClient.get(this.api.thevirustracker + '/free-api?global=stats').subscribe((res: any) => {
      this.Global.totalCases = res.results[0].total_cases;
      this.Global.totalDead = res.results[0].total_deaths;
      this.Global.totalRecovered = res.results[0].total_recovered;
      this.Global.newCases = res.results[0].total_new_cases_today;
      this.Global.newDeaths = res.results[0].total_new_deaths_today;
      this.Global.totalActiveCases = res.results[0].total_active_cases;
      this.Global.totalSeriousCases = res.results[0].total_serious_cases;
    });
  }

  async getStateData() {
    this.httpClient.get(this.api.rootnet + '/covid19-in/stats/latest').subscribe((res: any) => {
      // this.stateDataTotal = res.data.slice(-1)[0].summary;
      this.stateDataTotal = res.data.summary;
      this.stateData = res.data.regional;
      var total: stateTable = {
        loc: "Total Active",
        confirmedCasesIndian: this.stateDataTotal.confirmedCasesIndian,
        confirmedCasesForeign: this.stateDataTotal.confirmedCasesForeign,
        discharged: this.stateDataTotal.discharged,
        deaths: this.stateDataTotal.deaths
      }
      this.stateData.push(total);
    })
  }

  getNews() {
    this.httpClient.get(this.api.rootnet + '/covid19-in/unofficial/covid19india.org/statewise').subscribe((res: any) => {
      console.log(res);
    });
  }
}
