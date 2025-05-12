import { Injectable } from '@angular/core';

import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import { KeycloakService } from '../keycloak/keycloak.service';
@Injectable({
  providedIn: 'root'
})
//attach an authorization token (retrieved from the KeycloakService) to the request headers if the token is available
export class HttpTokenService implements HttpInterceptor {

    constructor(private keycloakService: KeycloakService) {
    }
    //This service is typically used to ensure that all outgoing HTTP requests include the user's authentication token, enabling secure communication with backend APIs that require authentication.
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.keycloakService.keycloak.token;
    if (token) {
      const authReq = request.clone({
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
    return next.handle(authReq);
  }
  return next.handle(request);

}
}
