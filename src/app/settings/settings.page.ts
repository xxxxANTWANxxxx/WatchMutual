import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(public router: Router, public oauthService: OAuthService) { }

  ngOnInit() {
  }

  logout() {
    this.oauthService.logOut(true);
    this.router.navigateByUrl('/login');
  }

}
