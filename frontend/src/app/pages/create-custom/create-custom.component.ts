import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UrlShorteningApIsService } from 'src/app/generatedServices/services/url-shortening-ap-is.service';
@Component({
  selector: 'app-create-custom',
  templateUrl: './create-custom.component.html',
  styleUrls: ['./create-custom.component.css']
})
export class CreateCustomComponent {
  @ViewChild('url') inputElement!: ElementRef;
  @ViewChild('short') shortElement!: ElementRef;
  isCollapsed:boolean = false;


 constructor(private linkService:UrlShorteningApIsService,private toastr: ToastrService
          ,private router:Router) {}
  shortenCustom():void{
    const url=this.inputElement.nativeElement.value;
    const shortUrl=this.shortElement.nativeElement.value;
    const customUrlRequest={
      originalUrl: url,
      shortUrl: shortUrl
    }
    const params={
      body:customUrlRequest
    };
    this.linkService.createCustomUrl$Response(params).subscribe({
      next: (response) => {
        console.log("created custom link ",response.body);
        this.toastr.success('Custom link created successfully!', 'Success');
        this.router.navigate(['/customLinks']);

      },
      error: (error) => {
        console.error('Error creating custom link:', error);
        this.toastr.error('Failed to create custom link', 'Error');
      }
    });

    }
    onSideBarCollapsed(collapsed:boolean): void {
      this.isCollapsed=collapsed;
      console.log("collapsed ",collapsed);

    }
    //todo add exception handling

}
