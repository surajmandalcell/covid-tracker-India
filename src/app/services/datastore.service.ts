import { news, contacts, countries } from './../models/general';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateTable } from '../models/general';
import { Global } from '../models/fetchTypes';

@Injectable({
  providedIn: 'root',
})
export class DatastoreService {
  // News
  News: news;

  // Contacts
  Contacts: contacts[];
  contactColumns: string[] = ['loc', 'number'];

  // India stats
  India = {
    deathsIn: 0,
    activeIn: 0,
    confirmedIn: 0,
    recoveredIn: 0,
  };

  // Global Stats
  Global = {
    totalConfirmed: 0,
    totalDeaths: 0,
    totalRecovered: 0,
  };

  // Global Country Data
  countries: countries[];
  countries2: countries[];

  // State Data
  stateDataTotal: any;
  stateData: stateTable[];
  displayedColumns: string[] = [
    'loc',
    'confirmedCasesIndian',
    'discharged',
    'deaths',
  ];

  // Graphs data
  deathRateByAge = [
    { name: '80+', value: 14.8 },
    { name: '70-79', value: 8.0 },
    { name: '60-69', value: 3.6 },
    { name: '50-59', value: 1.3 },
    { name: '40-49', value: 0.4 },
    { name: '30-39', value: 0.2 },
    { name: '20-29', value: 0.2 },
    { name: '10-19 ', value: 8.0 },
    { name: '0-9', value: 0.0 },
  ];

  // Api links
  api = {
    rootnet: 'https://api.rootnet.in',
    smartable: 'https://api.smartable.ai',
    lmaoninja: 'https://corona.lmao.ninja',
    covid19api: 'https://api.covid19api.com',
    thevirustracker: 'https://thevirustracker.com',
    chris: 'https://covid19-server.chrismichael.now.sh',
  };
  params = {
    // Global
    global: '/world/total',
    // Smartable
    news: '/coronavirus/news/IN',
    // lmaoninja
    countries: '/v2/countries',
    // rootnet
    contacts: '/covid19-in/contacts',
    stateWiseData: '/covid19-in/stats/latest',
    countryData: '/covid19-in/unofficial/covid19india.org/statewise',
    // chris
    globalDeathsOverTime: '/api/v1/Deaths',
    fatalityRateByAge: '/api/v1/FatalityRateByAge',
  };

  constructor(public httpClient: HttpClient) {}

  // Get India statistics
  async getCountryData() {
    this.httpClient
      .get(this.api.rootnet + this.params.countryData)
      .subscribe((res: any) => {
        this.India.deathsIn = res.data.total.deaths;
        this.India.activeIn = res.data.total.active;
        this.India.confirmedIn = res.data.total.confirmed;
        this.India.recoveredIn = res.data.total.recovered;
      });
  }

  // Get GLOBAL statistics using chris api
  async getGlobalData() {
    this.httpClient
      .get(this.api.covid19api + this.params.global)
      .subscribe((res: Global) => {
        console.log(res);
        // The day is reset after midnight GMT+0
        this.Global.totalConfirmed = res?.TotalConfirmed;
        this.Global.totalDeaths = res?.TotalDeaths;
        this.Global.totalRecovered = res?.TotalRecovered;
      });
  }

  // Get global data country wise
  async getAllCountry() {
    this.httpClient
      .get(this.api.lmaoninja + this.params.countries)
      .subscribe((res: any) => {
        console.log('getting country wise data..');
        console.log(res);
        this.countries = res;
        this.countries2 = res;
      });
  }

  async getStateData() {
    this.httpClient
      .get(this.api.rootnet + this.params.stateWiseData)
      .subscribe((res: any) => {
        // this.stateDataTotal = res.data.slice(-1)[0].summary;
        this.stateDataTotal = res.data.summary;
        this.stateData = res.data.regional;
        const total: StateTable = {
          loc: 'Total Active',
          confirmedCasesIndian: this.stateDataTotal.confirmedCasesIndian,
          discharged: this.stateDataTotal.discharged,
          deaths: this.stateDataTotal.deaths,
        };
        this.stateData.push(total);
      });
  }

  async getNews() {
    this.httpClient
      .get(this.api.smartable + this.params.news, {
        headers: { 'Subscription-Key': '8eb78bdc407945baa9f264db6c2afc2a' },
      })
      .subscribe((res: any) => {
        console.log(res);
        this.News = res.news.filter((x: any) => {
          return !['washingtonpost.com', 'bbc.com'].includes(x.provider.domain);
        });
        console.log(this.News);
      });
  }

  async getContacts() {
    this.httpClient
      .get(this.api.rootnet + this.params.contacts)
      .subscribe((res: any) => {
        console.log(res.data.contacts.regional);
        this.Contacts = res.data.contacts.regional;
      });
  }

  sanitize(value: any): number {
    return value.replace(/[^a-zA-Z0-9]/g, '');
  }
}
