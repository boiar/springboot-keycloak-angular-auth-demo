import { Injectable } from '@angular/core';
import Keycloak from "keycloak-js";
import {UserProfile} from "./user-profile";

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private keycloak: Keycloak | undefined;
  private userProfile: UserProfile | undefined
  constructor() { }

  get getKeycloak(){
    if (!this.keycloak) {
      this.keycloak = new Keycloak({
        url: 'http://127.0.0.1:9090',
        realm: 'book-social-network',
        clientId: 'bsn-angular'
      })
    }
    return this.keycloak;
  }

  get getUserProfile(): UserProfile | undefined {
    return this.userProfile;
  }

  async init() {
    console.log('Authentication user ...')
    const authenticated = await this.getKeycloak.init({
      onLoad: 'login-required',
      checkLoginIframe: false
    });

    if (authenticated) {
      this.userProfile = (await this.getKeycloak?.loadUserProfile()) as UserProfile;
      this.userProfile.token = this.getKeycloak?.token;
    }
  }

  login(){
    return this.getKeycloak?.login();
  }

  logout(){
    return this.getKeycloak?.logout({redirectUri: 'http://localhost:4200'});
  }

}
