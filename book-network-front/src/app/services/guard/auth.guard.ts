import {CanActivateFn, Router} from '@angular/router';
import {TokenService} from '../token/token.service';
import {inject} from '@angular/core';
import {KeycloakService} from "../keycloak/keycloak.service";

export const authGuard: CanActivateFn = () => {
  const keyCloakService = inject(KeycloakService);
  const router = inject(Router);
  if (keyCloakService.getKeycloak?.isTokenExpired()) {
    router.navigate(['login']);
    return false;
  }
  return true;
};
