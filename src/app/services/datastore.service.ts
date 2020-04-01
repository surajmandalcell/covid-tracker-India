import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatastoreService {
  news:any;
  apiNews:string = 'https://thevirustracker.com/free-api?countryNewsTotal=IN';

  constructor(public httpClient: HttpClient) { }

  getNews(){
    this.httpClient.get(this.apiNews).subscribe((res: any) => {
      this.news = res.countrynewsitems[0][3000];
      console.log(this.news);
    });
  }
}
