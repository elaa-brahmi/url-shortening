import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { KeycloakService } from '../keycloak/keycloak.service';
import {inject} from '@angular/core';

export const GuardService: CanActivateFn = () =>{
  const keycloak = new KeycloakService();
  const router:Router= inject(Router);
  if (keycloak.keycloak?.isTokenExpired()) {
    router.navigate(['/login']);
      return false;

  }
  return true;

}



