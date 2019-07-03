import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { OAuthService, UrlHelperService, OAuthModule } from 'angular-oauth2-oidc';
import { LoginPage } from '../app/login/login.page';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageModule } from './login/login.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [LoginPage],
  imports: [BrowserModule, IonicModule.forRoot(), OAuthModule.forRoot(), AppRoutingModule, FormsModule, HttpClientModule, LoginPageModule, IonicModule],
  providers: [
    UrlHelperService,
    OAuthService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
