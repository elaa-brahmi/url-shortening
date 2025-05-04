import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlShortened } from '../generatedServices/models/url-shortened';

@Injectable({
  providedIn: 'root'
})
export class ManualLinkService {

  private basePath = 'http://localhost:8080/shorten'; // or from environment.ts

  constructor(private http: HttpClient) {}

  getByShortUrl(shortUrl: string): Observable<UrlShortened> {
    const url = `${this.basePath}/getById/${encodeURIComponent(shortUrl)}`;
    return this.http.get<UrlShortened>(url);
  }

}
