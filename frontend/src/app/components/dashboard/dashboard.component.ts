import { Component, ElementRef, ViewChild } from '@angular/core';
import { UrlShorteningApIsService } from 'src/app/generatedServices/services/url-shortening-ap-is.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @ViewChild('input') input: ElementRef | undefined;
  constructor(private Shortservice:UrlShorteningApIsService,private toastr: ToastrService
    ,private router:Router,private snackBar: MatSnackBar) {
      // Initialize any properties or services needed for the dashboard
  }
  shorten(): void {
    // Implement the URL shortening logic here
    if (this.input) {
      console.log("url entered ",this.input.nativeElement.value);
      const url = this.input.nativeElement.value;
      const urlRequest = {
        originalUrl: url
      };

      const params = {
        body: urlRequest
      };
      this.Shortservice.createUrl$Response(params).subscribe(
              (response) => {
                console.log("shortened url ",response);
                /* this.toastr.success('URL shortened successfully!', 'Success'); */
              // this.notyf.success('URL shortened successfully!');
              this.snackBar.open('URL created successfully!', 'Close', {
                duration: 40000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
                panelClass: ['custom-snackbar'] // Add your custom class here
              });
              },
              (error) => {
                console.error('Error shortening URL:', error);
              }
            );

          }
        }

}
