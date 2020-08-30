import { DatastoreService } from './../services/datastore.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public data: DatastoreService) {}

  ngOnInit() {
    this.data.getCountryData();
    this.data.getGlobalData();
    this.data.getStateData();
  }

}
