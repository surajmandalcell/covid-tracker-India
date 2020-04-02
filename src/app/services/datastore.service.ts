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
    rootnet: 'https://api.rootnet.in',
    thevirustracker: 'https://thevirustracker.com',
    chris: 'https://covid19-server.chrismichael.now.sh',
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
    this.httpClient.get(this.api.chris + '/api/v1/AllReports').subscribe((res: any) => {
      // The day is reset after midnight GMT+0
      const reports = res.reports[0].table[0].slice(-1)[0];
      this.Global.totalCases = this.sanitize(reports.TotalCases);
      this.Global.totalDead = this.sanitize(reports.TotalDeaths);
      this.Global.totalRecovered = this.sanitize(reports.TotalRecovered);
      this.Global.newCases = this.sanitize(reports.NewCases);
      this.Global.newDeaths = this.sanitize(reports.NewDeaths);
      this.Global.totalActiveCases = this.sanitize(reports.ActiveCases);
      this.Global.totalSeriousCases = this.sanitize(reports.Serious_Critical);
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

  sanitize(value:any): string{
    return value.replace(/[^a-zA-Z0-9]/g, "");
  }
}
