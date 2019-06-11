import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { OAuthService } from 'angular-oauth2-oidc';
import { LoginPage } from '../app/login/login.page';

import { TabsPage } from '../app/tabs/tabs.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  rootPage: any = TabsPage;

  constructor( private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar, private oauthService: OAuthService, private router: Router ) {
    if(oauthService.hasValidIdToken()) {
      this.router.navigateByUrl('/tab1');
    } else {
      this.router.navigateByUrl('/login');
    }

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
