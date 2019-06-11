import { Component } from '@angular/core';
import { LoginPage } from '../login/login.page';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public router: Router, public oauthService: OAuthService) {}

  logout() {
    this.oauthService.logOut(true);
    this.router.navigateByUrl('/login');
  }

  get givenName() {
    const claims: any = this.oauthService.getIdentityClaims();
    if(!claims) {
      return null;
    }
    return claims.name;
  }

  get claims() {
    return this.oauthService.getIdentityClaims();
  }

  clickEvent() {
    this.router.navigateByUrl('/stickers');
  }

}
