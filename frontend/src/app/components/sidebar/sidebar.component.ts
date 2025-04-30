import { Component } from '@angular/core';
import {  ElementRef, Renderer2, ViewChild } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isShowDarkLight: boolean = false;
  showdarklight():void{
    this.isShowDarkLight = !this.isShowDarkLight;
  }
    isCollapsed = false;

    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    }

}
