import { Component, ChangeDetectorRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  dark:boolean=true;

  getDark(theme:boolean){
    this.dark = theme;
    console.log("parent emit")
  }

  constructor(private changeDetectorRef: ChangeDetectorRef){}

  ngOnInit(): void{
    this.changeDetectorRef.detectChanges();
  }
}
