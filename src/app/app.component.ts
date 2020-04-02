import { ThemeService } from './services/theme.service';
import { Component, Renderer2, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  dark: boolean = !!localStorage.getItem('theme');
  subscription: Subscription;

  constructor(
    private renderer: Renderer2,
    theme: ThemeService
  ) {
    this.setTheme();
    this.subscription = theme.darkObs.subscribe((val)=>{
      this.dark = val;
      this.setTheme();
    })
  }

  setTheme(){
    if (this.dark) {
      this.renderer.addClass(document.body, 'dark-mode');
    } else {
      this.renderer.removeClass(document.body, 'dark-mode');
    }
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
