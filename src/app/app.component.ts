import { HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';

import { stateTable, newsTable } from './models/general';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dark:boolean=false;

  toggle(){
    this.dark =! this.dark;
    if(this.dark){
      this.goDark();
    }else{
      this.goLight();
    }
    console.log("Dark theme : " + this.dark);
  }

  goDark(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#000';
    localStorage.setItem('theme', 'true');
  }

  goLight(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#eeeef3';
    localStorage.setItem('theme', 'false');
  }

  title = 'Covid 19';

  //India Specific Data
  deathsIn: number;
  activeIn: number;
  confirmedIn: number;
  recoveredIn: number;
  newDeathsTodayIn: number;
  newConfirmedTodayIn: number;

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
  readonly api2 = 'https://api.rootnet.in/covid19-in/stats/daily';

  displayedColumns: string[] = ['loc', 'confirmedCasesIndian', 'confirmedCasesForeign', 'discharged', 'deaths'];
  newsColumns: string[] = ['image', 'title', 'time'];

  constructor(public httpClient: HttpClient, private elementRef: ElementRef) {
    this.getCountryData();
    this.getGlobalData();
    this.getStateData();
    if(localStorage.getItem('theme')=='true'){
      this.goDark();
      this.dark=true;
    }else{
      this.dark=false;
    }
  }

  consol(){
    console.log();
    console.log(this.newsData);
  }

  getCountryData() {
    this.httpClient.get(this.apiUrl + '/free-api?countryTotal=IN').subscribe((res: any) => {
      this.deathsIn = res.countrydata[0].total_deaths;
      this.confirmedIn = res.countrydata[0].total_cases;
      this.activeIn = res.countrydata[0].total_active_cases;
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
      this.newCases = res.results[0].total_new_cases_today;
      this.newDeaths = res.results[0].total_new_deaths_today;
      this.totalActiveCases = res.results[0].total_active_cases;
      this.totalSeriousCases = res.results[0].total_serious_cases;
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
