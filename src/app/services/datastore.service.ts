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
    deathsIn: 0,
    activeIn: 0,
    confirmedIn: 0,
    recoveredIn: 0,
  }

  // Global Stats
  Global = {
    newCases: 0,
    totalDead: 0,
    newDeaths: 0,
    totalCases: 0,
    totalRecovered: 0,
    totalActiveCases: 0,
    totalSeriousCases: 0,
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
  params={
    // chris
    globalData: '/api/v1/AllReports',
    globalDeathsOverTime: '/api/v1/Deaths',
    fatalityRateBySex: '/api/v1/FatalityRateBySex',
    fatalityRateByAge: '/api/v1/FatalityRateByAge',
    fatalityRateByComorbidities: '/api/v1/FatalityRateByComorbidities',
    // Thevirustracker
    globalData2: '/free-api?global=stats',
    // rootnet
    stateWiseData: '/covid19-in/stats/latest',
    countryData: '/covid19-in/unofficial/covid19india.org/statewise',
  }

  constructor(public httpClient: HttpClient) {
    this.getCountryData();
    this.getGlobalData();
    this.getStateData();
  }

  // Get India statistics
  async getCountryData() {
    this.httpClient.get(this.api.rootnet + this.params.countryData).subscribe((res: any) => {
      this.India.deathsIn = res.data.total.deaths;
      this.India.activeIn = res.data.total.active;
      this.India.confirmedIn = res.data.total.confirmed;
      this.India.recoveredIn = res.data.total.recovered;
    });
  }

  // Get global statistics using chris api
  async getGlobalData() {
    this.httpClient.get(this.api.chris + this.params.globalData).subscribe((res: any) => {
      // The day is reset after midnight GMT+0
      const reports = res.reports[0].table[0].slice(-1)[0];
      this.Global.totalCases = this.sanitize(reports.TotalCases);
      this.Global.totalDead = this.sanitize(reports.TotalDeaths);
      this.Global.totalRecovered = this.sanitize(reports.TotalRecovered);
      this.Global.newCases = this.sanitize(reports.NewCases);
      this.Global.newDeaths = this.sanitize(reports.NewDeaths);
      this.Global.totalActiveCases = this.sanitize(reports.ActiveCases);
      this.Global.totalSeriousCases = this.sanitize(reports.Serious_Critical);
    },
    (error)=>{
      console.log(error);
      this.getGlobalData2();
    });
  }


  // Using thevirustracker
  async getGlobalData2() {
    this.httpClient.get(this.api.thevirustracker + this.params.globalData2).subscribe((res: any) => {
      this.Global.totalCases = res.result[0].total_cases;
      this.Global.totalDead = res.result[0].total_deaths;
      this.Global.totalRecovered = res.result[0].total_recovered;
      this.Global.newCases = res.result[0].total_new_cases_today;
      this.Global.newDeaths = res.result[0].total_new_deaths_today;
      this.Global.totalActiveCases = res.result[0].total_active_cases;
      this.Global.totalSeriousCases = res.result[0].total_serious_cases;
    });
  }

  getStateData() {
    this.httpClient.get(this.api.rootnet + this.params.stateWiseData).subscribe((res: any) => {
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
    this.httpClient.get(this.api.thevirustracker).subscribe((res: any) => {
      console.log(res);
    });
  }

  sanitize(value:any): number{
    return value.replace(/[^a-zA-Z0-9]/g, "");
  }
}
