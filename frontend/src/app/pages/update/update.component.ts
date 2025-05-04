import { Component, ElementRef, EventEmitter, Input, OnInit,Output,ViewChild } from '@angular/core';
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
  @Output() closeEvent = new EventEmitter<boolean>();
  closeUpdate:boolean = false;
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
  @ViewChild('url') inputElement!: ElementRef;
  @ViewChild('short') shortElement!: ElementRef;
  qrcode:any;
   constructor(private linkService:UrlShorteningApIsService,private toastr: ToastrService
            ,private router:Router,private route:ActivatedRoute
          ,private manualService:ManualLinkService) {}

  onSideBarCollapsed(collapsed: boolean): void {
    console.log("collapsed ", collapsed);
  }
  closeupdate(){
    this.closeUpdate=true;
    this.closeEvent.emit(this.closeUpdate);

  }
  ngOnInit(){
    console.log("your received link id ",this.shortUrl);
    this.manualService.getByShortUrl(this.shortUrl).subscribe(
      (response) => {
        this.link=response;
        console.log("link ",this.link);
        this.inputElement.nativeElement.value = this.link.originalUrl;
        this.qrcode = this.link.originalUrl;
        this.shortElement.nativeElement.value = this.link.shortenedUrl?.substring(8);
      }
      ,(error) => {
        console.error('Error fetching links:', error);
      }
    );
  }
  updateLink(){
    const requestUrl={
      originalUrl:this.inputElement.nativeElement.value
    }
    const params={
      id: this.link.id?.toString() || '',
      body: requestUrl
    }

    this.linkService.updateUrl$Response(params).subscribe(
      (response) => {
        console.log("link updated ",response);
        window.location.reload();

      }
      ,(error) => {
        console.error('Error updating link:', error);
        if (error.error && typeof error.error === 'object') {
          const errorObject = error.error; // Use the error object directly
          console.log('Error object:', errorObject);

          if (errorObject.originalUrl) {
            const errorMessage = errorObject.originalUrl;
            console.log('Error message:', errorMessage);
            this.toastr.error(errorMessage, 'Error');
          }
        } else {
          this.toastr.error('An unexpected error occurred', 'Error');
        }
      }
    );


  }

}
