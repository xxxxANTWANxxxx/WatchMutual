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

  constructor(private navCtrl: NavController, private oauthService: OAuthService, private router: Router) { 
    oauthService.redirectUri = window.location.origin;
    oauthService.clientId = '0oaoj03mgLuPBolpM356';
    oauthService.scope = 'openid profile email';
    oauthService.oidc = true;
    oauthService.issuer = 'https://dev-228011.okta.com/oauth2/default';
    oauthService.tokenValidationHandler = new JwksValidationHandler();
    
    this.oauthService.loadDiscoveryDocument().then(() => {
      this.oauthService.tryLogin();
    });
  }

  ionViewDidLoad(): void {
    setTimeout(() => {
      this.email.setFocus();
    }, 500);  
  }

  ngOnInit() {
  }

  login(): void {
    this.oauthService.createAndSaveNonce().then(nonce => {
      const authClient = new OktaAuth({
        clientId: '0oaoj03mgLuPBolpM356',
        redirectUri: 'http://localhost:4200/implicit/callback',
        url: 'https://dev-228011.okta.com',
        issuer: 'default'
      });
      return authClient.signIn({
        username: this.username,
        password: this.password
      }).then(response => {
        if(response.status === 'SUCCESS') {
          this.router.navigateByUrl('/');
          return authClient.token.getWithoutPrompt({
            nonce: nonce,
            responseType: ['id_token', 'token'],
            sessionToken: response.sessionToken,
            scopes: this.oauthService.scope.split(' ')
          })
          .then(tokens => {
            const idToken = tokens[0].idToken;
            const accessToken = tokens[1].accessToken;
            const keyValuePair = '#id_token=${encodeURIComponent(idToken)}&access_token=${encodeURIComponent(accessToken)}';
            this.oauthService.tryLogin({
              customHashFragment: keyValuePair,
              disableOAuth2StateCheck: true
            });
          });
        } else {
          throw new Error('We cannot handle the ' + response.status + ' status');
        }
      }).fail(error => {
        console.error(error);
        this.error = error.message;
      });
    });
  }

}


