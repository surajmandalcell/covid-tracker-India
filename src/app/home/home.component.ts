import { DatastoreService } from './../services/datastore.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public data: DatastoreService) {
    this.data.getCountryData();
    this.data.getGlobalData();
    this.data.getStateData();
  }

}
