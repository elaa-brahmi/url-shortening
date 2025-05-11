import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserProfile } from './user-profile';
//will be started when the app is started
@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private _keycloak: Keycloak | undefined;
  private profile:UserProfile|undefined;
  get userProfile(): UserProfile | undefined {
    return this.profile;
  }

  get keycloak() {
    if(!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:9090',
        realm: 'url-shortening',
        clientId: 'url'

    });}
    return this._keycloak;
  }
  constructor() { }
  async init() { //runs when the app is started
    console.log('Authenticating the user ...');
    const authenticated = await this.keycloak?.init({
      onLoad: 'login-required',

  });
    if (authenticated) {
      console.log('User authenticated');
      this.profile = (await this.keycloak?.loadUserProfile()) as UserProfile;
      this.profile.token = this.keycloak?.token;
      console.log('User profile loaded', this.profile);
    }
  }
  login() {
    this.keycloak?.login();
  }
  logout() {
    this.keycloak?.logout({redirectUri: 'http://localhost:4200'});
  }



}
