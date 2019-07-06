import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit
{
  public userType: string;



  constructor(public router: Router, public oauthService: OAuthService, private http: HttpClient)
  {

    this.userType = this.router.getCurrentNavigation().extras.state.userType;

  }

  ngOnInit()
  {
  }

  logout()
  {
    /*const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };

    this.http.post("http://localhost:4200/settings", httpOptions)
      .subscribe();*/
    this.router.navigateByUrl('/login');
  }
  admin()
  {
    this.router.navigateByUrl('/admin');
  }

}
