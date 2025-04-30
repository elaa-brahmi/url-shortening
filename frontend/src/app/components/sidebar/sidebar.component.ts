import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private router: Router) {}
  navigateToLinks(){

    this.router.navigate(['/links']);
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
