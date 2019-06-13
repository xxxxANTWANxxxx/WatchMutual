import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
declare const OktaAuth: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  @ViewChild('email') email: any;
  private username: string;
  private password: string;
  private error: string;

  constructor(private navCtrl: NavController, private router: Router) { 
  }

  ngOnInit() {
  }

  login(): void {
    console.log('Login successful');
    this.router.navigateByUrl('/');
  }

}


