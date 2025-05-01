import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/theme.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isthemeDarkLight: boolean = false;
  constructor(private router: Router,private themeService: ThemeService) {}
  navigateToLinks(){
    this.router.navigate(['/links']);
  }
  setDarkTheme(): void {
    this.themeService.setDarkTheme();
  }

  setLightTheme(): void {
    this.themeService.setLightTheme();
  }
  isShowDarkLight: boolean = false;
  showdarklight():void{
    this.isShowDarkLight = !this.isShowDarkLight;
  }
    isCollapsed = false;

    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    }

}
