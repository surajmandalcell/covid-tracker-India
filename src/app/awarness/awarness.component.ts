import { DatastoreService } from './../services/datastore.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-awarness',
  templateUrl: './awarness.component.html',
  styleUrls: ['./awarness.component.scss']
})
export class AwarnessComponent {
  
  constructor(public data: DatastoreService) {
    data.getContacts();
   }
}
