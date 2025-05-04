import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlShortened } from '../generatedServices/models/url-shortened';

@Injectable({
  providedIn: 'root'
})
export class ManualLinkService {

  private basePath = 'http://localhost:8080/shorten'; // or from environment.ts

  constructor(private http: HttpClient) {}

  getByShortUrl(shortUrl: string): Observable<UrlShortened> {
    const url = `${this.basePath}/getById`;
    const params = new HttpParams().set('shortUrl', shortUrl); // for @requestParam
    return this.http.get<UrlShortened>(url, { params });
  }

}
