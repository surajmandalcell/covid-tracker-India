import { DatastoreService } from './../services/datastore.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  constructor(private data: DatastoreService,public httpClient: HttpClient) { }

  ngOnInit(): void {
    this.data.getNews();
  }

}
