import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkTheme = false;
  constructor() { }
  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    const themeClass = this.isDarkTheme ? 'dark-theme' : 'light-theme';
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(themeClass);
  }

  setDarkTheme(): void {
    this.isDarkTheme = true;
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
  }

  setLightTheme(): void {
    this.isDarkTheme = false;
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
  }
}
