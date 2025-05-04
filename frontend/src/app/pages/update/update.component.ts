import { Component, ElementRef, Input, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UrlShorteningApIsService } from 'src/app/generatedServices/services/url-shortening-ap-is.service';
import { ActivatedRoute } from '@angular/router';
import { UrlShortened } from 'src/app/generatedServices/models/url-shortened';
import { ManualLinkService } from 'src/app/manualService/manual-link.service';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  link:UrlShortened={
    accessCount:0,
    createdAt:"",
    id:0,
    originalUrl:"",
    shortenedUrl:"",
    type:"",
    updatedAt:""
  }
  @Input() shortUrl: string = '';
  isCollapsed:boolean = false;
  @ViewChild('input') inputElement!: ElementRef;
  @ViewChild('short') shortElement!: ElementRef;
  @ViewChild('qrcode') qrcodeElement!: ElementRef;
   constructor(private linkService:UrlShorteningApIsService,private toastr: ToastrService
            ,private router:Router,private route:ActivatedRoute
          ,private manualService:ManualLinkService) {}

  onSideBarCollapsed(collapsed: boolean): void {
    console.log("collapsed ", collapsed);
  }
  ngOnInit(){
    console.log("your received link id ",this.shortUrl);

    this.manualService.getByShortUrl(this.shortUrl).subscribe(
      (response) => {
        console.log("all links ",response);
        this.link=response;
        console.log("link ",this.link);

      }
      ,(error) => {
        console.error('Error fetching links:', error);
        //this.toastr.info('no links yet', 'info');
      }
    );



  }
  update(){

  }

}
