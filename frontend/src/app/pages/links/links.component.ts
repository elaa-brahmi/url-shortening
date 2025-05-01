import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent {
    constructor(private router: Router) {}
    leetcodeLink:string='https://leetcode.com/explore/featured/card/leetcodes-interview-crash-course-data-structures-and-algorithms/710/binary-search/';
    getFaviconUrl(siteUrl: string): string {
      try {
        const domain = new URL(siteUrl).hostname;
        return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
      } catch (e) {
        return ''; // fallback if URL is invalid
      }
    }

}
