import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UrlShorteningApIsService } from 'src/app/generatedServices/services/url-shortening-ap-is.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent {
  @ViewChild('input') inputElement!: ElementRef;
  @ViewChild('shortUrl') shortUrlInput!: ElementRef;
  selectedshortUrl: string = '';
  links:any[] = [];
  sortDateAsc: boolean = false;
  sortDateDesc: boolean = false;
  sortDate: boolean = false;
  isVisible = true;
  WillupdateLink:boolean=false;
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
      this.links=[];
      this.linkService.getAllUrls$Response().subscribe(
        (response) => {
          console.log("all links ",response.body);
          response.body.filter(link => link.type=="generated").forEach(link => {
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
     copyToClipboard(url: string,idUrl:string): void {

      const params = {
        id: idUrl
      };
      this.linkService.copyUrl$Response(params).subscribe(
        (response) => {
          this.links=[];
          this.getLinks();
          console.log("copied link ",response);
        }
      );

      navigator.clipboard.writeText(url).then(() => {
        this.toastr.success('Link copied to clipboard!', 'Success');
      }).catch(err => {
        console.error('Failed to copy: ', err);
        this.toastr.error('Failed to copy link', 'Error');
      });



    }
    updateLink(shortUrl: string): void {
      this.WillupdateLink=true;
      this.selectedshortUrl = shortUrl;
      console.log("selected link id ",this.selectedshortUrl);


    }
    deleteLink(linkId: string): void {
      const param={
        id:linkId
      }
      this.linkService.deleteUrl$Response(param).subscribe(
        (response) => {
          console.log("deleted link ",response.body);
          this.links = this.links.filter(link => link.id !== linkId);
          this.toastr.success('Link deleted successfully!', 'Success');
        },
        (error) => {
          console.error('Error deleting link:', error);
          this.toastr.error('Failed to delete link', 'Error');
        }
      );
    }

    search(shorturl:string):void{
      console.log("searching for ",shorturl);
    }
    onKeyUp(shorturl:string): void {
      if (shorturl.length === 0) {
        this.getLinks();
        return;
      }
      console.log("searching for on keyup ",shorturl);
      const params={
        shortUrl:shorturl
      }
      this.linkService.getOriginalUrl$Response(params).subscribe(
        (response) => {
          console.log("searched link ",response.body);
          //this.links.filter(link => link.shortUrl.contains(shorturl));
          this.links = this.links.filter(link => link.shortenedUrl.toLowerCase().includes(shorturl.toLowerCase()));
           // this.links.push( response.body)

            //this.getLinks();
        },
        (error: any) => {
          console.error('Error searching link:', error);
          this.links=[];
         // this.getLinks();
         // this.toastr.info('no link having such short url', 'info');
        }
      );
      console.log("searched link ", this.links);
    }
    filterNewestOldest(): void {
      this.sortDate=!this.sortDate;
      console.log("filtering links");
    }
    filterNewest(): void {

      this.sortDate=!this.sortDate;
      this.sortDateAsc = false;
      this.sortDateDesc = !this.sortDateDesc;
      console.log("sortDate ",this.sortDate);
      console.log("sortDateAsc ",this.sortDateAsc);
      console.log("sortDateDesc ",this.sortDateDesc);
      this.getLinks();
    }
    filterOldest(): void {

      this.sortDate=!this.sortDate;
      this.sortDateDesc = false;
      this.sortDateAsc = !this.sortDateAsc;
      console.log("sortDate ",this.sortDate);
      console.log("sortDateAsc ",this.sortDateAsc);
      console.log("sortDateDesc ",this.sortDateDesc);

      this.links.reverse();
    }



}
