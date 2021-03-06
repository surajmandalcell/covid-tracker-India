import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {
    if (this.dark) {
      this.goDark();
    }
  }

  dark: boolean = this.isDark();
  darkObs: Subject<boolean> = new Subject<boolean>();

  toggle() {
    this.dark = !this.dark;
    if (this.dark) {
      this.goDark();
    } else {
      this.goLight();
    }
  }

  goDark() {
    this.darkObs.next(true);
    localStorage.setItem('theme', 'true');
  }

  goLight() {
    this.darkObs.next(false);
    localStorage.setItem('theme', '');
  }

  isDark(): boolean {
    return !!localStorage.getItem('theme');
  }
}
