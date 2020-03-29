import { Component, ElementRef, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  @Input() dark:boolean;

  @Output() theme = new EventEmitter<boolean>();
  
  title = 'Covid 19';

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
    this.theme.emit(true);
  }

  goLight(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#eeeef3';
    localStorage.setItem('theme', 'false');
    this.theme.emit(false);
  }

  constructor( private elementRef: ElementRef) {}

  ngOnInit(): void {
    if(localStorage.getItem('theme')=='true'){
      this.goDark();
      this.dark=true;
      this.theme.emit(this.dark);
    }else{
      this.dark=false;
      this.theme.emit(this.dark);
    }
  }
  
}
