import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UrlShorteningApIsService } from 'src/app/generatedServices/services/url-shortening-ap-is.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent {
  links:any[] = [];
  ngOnInit(){
    this.getLinks();
  }
    constructor(private linkService:UrlShorteningApIsService,private toastr: ToastrService
        ,private router:Router) {}
  /*   leetcodeLink:string='https://leetcode.com/explore/featured/card/leetcodes-interview-crash-course-data-structures-and-algorithms/710/binary-search/';*/
    getFaviconUrl(siteUrl: string): string {
      try {
        const domain = new URL(siteUrl).hostname;
        return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
      } catch (e) {
        return ''; // fallback if URL is invalid
      }
    }
     getLinks():void {
      this.linkService.getAllUrls$Response().subscribe(
        (response) => {
          console.log("all links ",response.body);
          response.body.forEach(link => {
            this.links.push(link)
        });
        console.log("all links ",this.links);
         // this.links = response.body;
        },
        (error) => {
          console.error('Error fetching links:', error);
          this.toastr.info('no links yet', 'info');
        }
      );


     }
     copyToClipboard(url: string): void {
      navigator.clipboard.writeText(url).then(() => {
        this.toastr.success('Link copied to clipboard!', 'Success');
      }).catch(err => {
        console.error('Failed to copy: ', err);
        this.toastr.error('Failed to copy link', 'Error');
      });
    }



}
