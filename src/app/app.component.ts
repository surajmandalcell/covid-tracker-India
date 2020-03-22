import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //India Specific Stats
  deathsIn:string;
  confirmedIn:string;
  recoveredIn: string;
  newDeathsTodayIn:string;
  newConfirmedTodayIn:string;
  // Global Stats
  newCases:string;
  totalDead:string;
  newDeaths:string;
  totalCases:string;
  totalRecovered:string;
  // Api url
  readonly apiUrl = 'https://thevirustracker.com';

  constructor(public httpClient: HttpClient){
    this.getCountryData();
    this.getGlobalData();
  }

  getCountryData(){
    this.httpClient.get(this.apiUrl+'/free-api?countryTotal=IN').subscribe((res:any) => {
      console.log(res);
      this.confirmedIn = res.countrydata[0].total_cases;
      this.deathsIn = res.countrydata[0].total_deaths;
      this.recoveredIn = res.countrydata[0].total_recovered;
      this.newDeathsTodayIn = res.countrydata[0].total_new_deaths_today;
      this.newConfirmedTodayIn = res.countrydata[0].total_new_cases_today;
    });
  }

  getGlobalData(){
    this.httpClient.get(this.apiUrl+'/free-api?global=stats').subscribe((res:any) => {
      console.log(res);
      this.totalCases = res.results[0].total_cases;
      this.totalDead = res.results[0].total_deaths;
      this.totalRecovered = res.results[0].total_recovered;
      this.newDeaths = res.results[0].total_new_deaths_today;
      this.newCases = res.results[0].total_new_cases_today;
    });
  }

  title = 'covid-tracker-India';
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
}
