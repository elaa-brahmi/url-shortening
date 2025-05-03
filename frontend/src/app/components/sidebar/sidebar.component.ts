import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/theme.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() sidebarCollapsed = new EventEmitter<boolean>(); // EventEmitter to notify parent
  isthemeDarkLight: boolean = false;
  isCollapsed = false;
  isShowDarkLight: boolean = false;


  constructor(public router: Router,private themeService: ThemeService) {}
  navigateToLinks(){
    this.router.navigate(['/links']);
  }
  setDarkTheme(): void {
    this.themeService.setDarkTheme();
  }

  setLightTheme(): void {
    this.themeService.setLightTheme();
  }
  showdarklight():void{
    this.isShowDarkLight = !this.isShowDarkLight;
  }
toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
      this.sidebarCollapsed.emit(this.isCollapsed); // Emit the collapsed state
      console.log('Sidebar collapsed:', this.isCollapsed);
      console.log('Sidebar collapsed event:', this.sidebarCollapsed);
}

}
