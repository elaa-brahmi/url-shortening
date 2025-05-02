import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  isSidebarCollapsed: boolean = false;
  onSideBarCollapsed(collapsed: boolean) {
    console.log('Sidebar collapsed event :', collapsed);
    this.isSidebarCollapsed=collapsed;
    console.log('Sidebar collapsed:', this.isSidebarCollapsed);

  }
}
